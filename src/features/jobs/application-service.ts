import "server-only";

import { createHash, createHmac, randomUUID } from "node:crypto";
import { siteConfig } from "@/config/site";
import { supabaseConfig } from "@/lib/supabase/config";
import { getVacancyBySlug, isVacancyOpen } from "@/lib/wordpress";
import {
  applicationFieldsSchema,
  JOB_APPLICATION_CONSENT_VERSION,
  safeFileExtension,
  validateCvFile,
} from "./application-validation";

const STORAGE_BUCKET = "apex-hr-candidate-documents";
const MAX_TEXT_FIELD_LENGTH = 5_000;

interface ApplicationSubmission {
  idempotencyKey: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  coverLetter: string;
  message: string;
  vacancySlug: string;
  sourcePath: string;
  attribution: Record<string, string>;
  cv: File;
}

export class ApplicationServiceError extends Error {
  constructor(
    readonly code: string,
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApplicationServiceError";
  }
}

function requiredText(formData: FormData, field: string, maxLength = MAX_TEXT_FIELD_LENGTH): string {
  const value = formData.get(field);
  if (typeof value !== "string" || value.length > maxLength) {
    throw new ApplicationServiceError("invalid-form", 400, "Check the application fields and try again.");
  }
  return value.trim();
}

function readAttribution(value: string): Record<string, string> {
  const allowed = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]);
  try {
    const parsed: unknown = JSON.parse(value || "{}");
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    const attribution: Record<string, string> = {};
    for (const [key, item] of Object.entries(parsed)) {
      if (allowed.has(key) && typeof item === "string") attribution[key] = item.slice(0, 200);
    }
    return attribution;
  } catch {
    return {};
  }
}

function parseSubmission(formData: FormData): ApplicationSubmission {
  if (formData.get("privacyConsent") !== "true") {
    throw new ApplicationServiceError("consent-required", 400, "Consent is required to submit your application.");
  }
  if (requiredText(formData, "website", 300)) {
    throw new ApplicationServiceError("invalid-form", 400, "We could not accept this submission.");
  }

  const fileValue = formData.get("cv");
  if (typeof File === "undefined" || !(fileValue instanceof File)) {
    throw new ApplicationServiceError("cv-required", 400, "Upload your CV or résumé.");
  }

  const fields = applicationFieldsSchema.safeParse({
    firstName: requiredText(formData, "firstName", 80),
    lastName: requiredText(formData, "lastName", 80),
    email: requiredText(formData, "email", 254),
    phone: requiredText(formData, "phone", 40),
    linkedin: requiredText(formData, "linkedin", 500),
    coverLetter: requiredText(formData, "coverLetter", 5_000),
    message: requiredText(formData, "message", 3_000),
  });
  if (!fields.success) {
    throw new ApplicationServiceError("invalid-form", 400, "Check the application fields and try again.");
  }

  const idempotencyKey = requiredText(formData, "idempotencyKey", 64);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idempotencyKey)) {
    throw new ApplicationServiceError("invalid-form", 400, "Refresh the page and try submitting your application again.");
  }

  const vacancySlug = requiredText(formData, "vacancySlug", 120);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(vacancySlug)) {
    throw new ApplicationServiceError("invalid-vacancy", 400, "This vacancy is not available for applications.");
  }

  const sourcePath = requiredText(formData, "sourcePath", 300);
  if (!sourcePath.startsWith("/jobs/") || sourcePath.includes("?") || sourcePath.includes("..")) {
    throw new ApplicationServiceError("invalid-form", 400, "Refresh the vacancy page and try again.");
  }

  return {
    idempotencyKey,
    ...fields.data,
    vacancySlug,
    sourcePath,
    attribution: readAttribution(requiredText(formData, "attribution", 2_000)),
    cv: fileValue,
  };
}

async function serviceFetch(path: string, init: RequestInit): Promise<Response> {
  if (!supabaseConfig.url || !supabaseConfig.serviceRoleKey) {
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  return fetch(`${supabaseConfig.url.replace(/\/+$/, "")}${path}`, {
    ...init,
    signal: init.signal ?? AbortSignal.timeout(15_000),
    headers: {
      apikey: supabaseConfig.serviceRoleKey,
      Authorization: `Bearer ${supabaseConfig.serviceRoleKey}`,
      ...init.headers,
    },
  });
}

async function verifyTurnstile(token: string, ipAddress: string): Promise<void> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  const body = new URLSearchParams({ secret, response: token, remoteip: ipAddress });
  let response: Response;
  try {
    response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    throw new ApplicationServiceError("security-check-unavailable", 503, "The security check is temporarily unavailable. Please try again.");
  }

  if (!response.ok) {
    throw new ApplicationServiceError("security-check-unavailable", 503, "The security check is temporarily unavailable. Please try again.");
  }

  const result: unknown = await response.json().catch(() => null);
  if (typeof result !== "object" || result === null || !("success" in result) || result.success !== true) {
    throw new ApplicationServiceError("security-check-failed", 400, "Complete the security check before submitting your application.");
  }
  const hostname = "hostname" in result && typeof result.hostname === "string" ? result.hostname.toLowerCase() : "";
  if (hostname !== new URL(siteConfig.productionUrl).hostname.toLowerCase()) {
    throw new ApplicationServiceError("security-check-failed", 400, "Complete the security check before submitting your application.");
  }
}

async function consumeRateLimit(ipAddress: string): Promise<void> {
  const rateKey = createHmac("sha256", supabaseConfig.serviceRoleKey).update(ipAddress).digest("hex");
  let response: Response;
  try {
    response = await serviceFetch("/rest/v1/rpc/consume_job_application_rate_limit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ p_rate_key: rateKey }),
    });
  } catch {
    throw new ApplicationServiceError("rate-limit-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }
  if (!response.ok) {
    console.error("[job-applications] rate limit check failed");
    throw new ApplicationServiceError("rate-limit-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }
  const allowed: unknown = await response.json().catch(() => false);
  if (allowed !== true) {
    throw new ApplicationServiceError("rate-limited", 429, "Too many applications were submitted from this connection. Please try again in a few minutes.");
  }
}

async function lookupIdempotentApplication(key: string): Promise<"sent" | "pending" | null> {
  const params = new URLSearchParams({ select: "notification_status", idempotency_key: `eq.${key}`, limit: "1" });
  const response = await serviceFetch(`/rest/v1/applications?${params.toString()}`, { method: "GET" });
  if (!response.ok) {
    console.error("[job-applications] idempotency lookup failed");
    throw new ApplicationServiceError("application-storage-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }
  const rows: unknown = await response.json().catch(() => null);
  if (!Array.isArray(rows)) {
    throw new ApplicationServiceError("application-storage-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }
  if (rows.length === 0) return null;

  const existing = rows[0];
  if (typeof existing !== "object" || existing === null || !("notification_status" in existing)) {
    throw new ApplicationServiceError("application-storage-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }
  const status = existing.notification_status;
  if (status !== "sent" && status !== "pending") {
    throw new ApplicationServiceError("application-storage-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }
  return status;
}

async function uploadCv(file: File, applicationId: string): Promise<{ path: string; checksum: string; originalName: string }> {
  const extension = safeFileExtension(file.name);
  const path = `applications/${applicationId}/${randomUUID()}${extension}`;
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const checksum = createHash("sha256").update(Buffer.from(await file.arrayBuffer())).digest("hex");
  const response = await serviceFetch(`/storage/v1/object/${STORAGE_BUCKET}/${encodedPath}`, {
    method: "POST",
    headers: { "Content-Type": file.type, "x-upsert": "false" },
    body: file,
  }).catch(() => {
    throw new ApplicationServiceError("cv-storage-unavailable", 503, "We could not securely store your CV. Please try again.");
  });
  if (!response.ok) {
    console.error(`[job-applications] CV storage failed (${response.status})`);
    throw new ApplicationServiceError("cv-storage-unavailable", 503, "We could not securely store your CV. Please try again.");
  }

  const originalName = file.name.replace(/\\/g, "/").split("/").pop()?.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 255) || `cv${extension}`;
  return { path, checksum, originalName };
}

async function deleteCv(path: string): Promise<void> {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const response = await serviceFetch(`/storage/v1/object/${STORAGE_BUCKET}/${encodedPath}`, { method: "DELETE" });
  if (!response.ok) console.error("[job-applications] private file cleanup failed");
}

async function insertApplication(submission: ApplicationSubmission, vacancy: NonNullable<Awaited<ReturnType<typeof getVacancyBySlug>>>, applicationId: string, cv: Awaited<ReturnType<typeof uploadCv>>) {
  const submittedAt = new Date().toISOString();
  const payload = {
    id: applicationId,
    idempotency_key: submission.idempotencyKey,
    first_name: submission.firstName,
    last_name: submission.lastName,
    candidate_email: submission.email,
    phone: submission.phone,
    linkedin_url: submission.linkedin || null,
    cover_letter: submission.coverLetter || null,
    additional_message: submission.message || null,
    job_external_id: String(vacancy.id),
    job_title: vacancy.title,
    job_slug: vacancy.slug,
    job_reference: vacancy.reference || null,
    job_path: `/jobs/${vacancy.slug}/`,
    source_path: submission.sourcePath,
    utm_attribution: submission.attribution,
    cv_bucket: STORAGE_BUCKET,
    cv_object_path: cv.path,
    cv_original_filename: cv.originalName,
    cv_detected_mime_type: submission.cv.type,
    cv_size_bytes: submission.cv.size,
    cv_checksum: cv.checksum,
    cv_scan_status: "pending",
    status: "received",
    notification_status: "pending",
    submitted_at: submittedAt,
    updated_at: submittedAt,
  };

  const response = await serviceFetch("/rest/v1/applications?on_conflict=idempotency_key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error(`[job-applications] application persistence failed (${response.status})`);
    throw new ApplicationServiceError("application-storage-unavailable", 503, "We could not save your application. Please try again.");
  }
  const result: unknown = await response.json().catch(() => []);
  if (!Array.isArray(result) || result.length === 0) return { duplicate: true, submittedAt };
  return { duplicate: false, submittedAt };
}

async function recordConsent(applicationId: string, sourcePath: string, submittedAt: string): Promise<void> {
  const response = await serviceFetch("/rest/v1/application_consents", {
    method: "POST",
    headers: { "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      application_id: applicationId,
      purpose: "job_application_processing",
      policy_version: JOB_APPLICATION_CONSENT_VERSION,
      consent_text_version: JOB_APPLICATION_CONSENT_VERSION,
      granted: true,
      recorded_at: submittedAt,
      source_path: sourcePath,
    }),
  });
  if (!response.ok) {
    console.error(`[job-applications] consent persistence failed (${response.status})`);
    throw new ApplicationServiceError("consent-storage-unavailable", 503, "We could not securely save your consent. Please try again.");
  }
}

async function sendResendEmail(to: string, subject: string, text: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.TRANSACTIONAL_EMAIL_FROM;
  if (!apiKey || !from) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) console.error(`[job-applications] email delivery failed (${response.status})`);
    return response.ok;
  } catch {
    console.error("[job-applications] email delivery failed");
    return false;
  }
}

async function notifyApplication(
  submission: ApplicationSubmission,
  vacancy: NonNullable<Awaited<ReturnType<typeof getVacancyBySlug>>>,
  applicationId: string,
  submittedAt: string,
  cv: Awaited<ReturnType<typeof uploadCv>>,
): Promise<boolean> {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(submittedAt));
  const candidateName = `${submission.firstName} ${submission.lastName}`;
  const internalRecipient = process.env.INTERNAL_LEAD_NOTIFICATION_EMAIL || siteConfig.contactEmail;
  const internalText = [
    `Candidate: ${candidateName}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    `Vacancy: ${vacancy.title}`,
    `Reference: ${vacancy.reference || "Not provided"}`,
    `Submitted: ${formattedDate} UTC`,
    `Application ID: ${applicationId}`,
    "",
    `CV access: Sign in to the authorised Supabase project, open the private ${STORAGE_BUCKET} bucket and retrieve object ${cv.path}. The file is marked ${"pending"} malware scan; follow internal scanning procedures before opening it.`,
    "No public or permanent file URL has been generated.",
  ].join("\n");
  const acknowledgement = [
    `Hello ${submission.firstName},`,
    "",
    `Thank you for applying for ${vacancy.title}${vacancy.reference ? ` (reference ${vacancy.reference})` : ""}.`,
    "Your application has been received. The Apex HR team will contact you if your experience matches the role.",
    "",
    "Apex HR",
  ].join("\n");

  const results = await Promise.all([
    sendResendEmail(internalRecipient, `Job application: ${vacancy.title}`, internalText),
    sendResendEmail(submission.email, `Application received: ${vacancy.title}`, acknowledgement),
  ]);
  return results.every(Boolean);
}

async function updateNotificationStatus(applicationId: string, delivered: boolean): Promise<void> {
  const response = await serviceFetch(`/rest/v1/applications?id=eq.${encodeURIComponent(applicationId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ notification_status: delivered ? "sent" : "pending", updated_at: new Date().toISOString() }),
  });
  if (!response.ok) console.error("[job-applications] notification status update failed");
}

export async function submitJobApplication(formData: FormData, ipAddress: string) {
  const submission = parseSubmission(formData);
  if (formData.get("privacyConsent") !== "true") {
    throw new ApplicationServiceError("consent-required", 400, "Consent is required to submit your application.");
  }
  const cvError = await validateCvFile(submission.cv);
  if (cvError) {
    throw new ApplicationServiceError(cvError, 400, "Upload a valid PDF, DOC or DOCX file of no more than 5 MB.");
  }
  if (!ipAddress) {
    throw new ApplicationServiceError("client-address-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  const existingNotificationStatus = await lookupIdempotentApplication(submission.idempotencyKey);
  if (existingNotificationStatus) return { duplicate: true, notificationStatus: existingNotificationStatus };

  const token = requiredText(formData, "turnstileToken", 2_048);
  await verifyTurnstile(token, ipAddress);
  await consumeRateLimit(ipAddress);

  const vacancy = await getVacancyBySlug(submission.vacancySlug);
  if (!vacancy || !isVacancyOpen(vacancy)) {
    throw new ApplicationServiceError("vacancy-closed", 409, "This vacancy is no longer accepting applications.");
  }
  if (!supabaseConfig.url || !supabaseConfig.serviceRoleKey) {
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }
  if (!process.env.RESEND_API_KEY || !process.env.TRANSACTIONAL_EMAIL_FROM) {
    throw new ApplicationServiceError("notification-service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  const applicationId = randomUUID();
  const cv = await uploadCv(submission.cv, applicationId);
  let applicationPersisted = false;
  try {
    const record = await insertApplication(submission, vacancy, applicationId, cv);
    if (record.duplicate) {
      await deleteCv(cv.path);
      return { duplicate: true, notificationStatus: "sent" as const };
    }
    applicationPersisted = true;
    await recordConsent(applicationId, submission.sourcePath, record.submittedAt);
    const delivered = await notifyApplication(submission, vacancy, applicationId, record.submittedAt, cv);
    await updateNotificationStatus(applicationId, delivered);
    return { duplicate: false, notificationStatus: delivered ? "sent" as const : "pending" as const };
  } catch (error) {
    if (!applicationPersisted) await deleteCv(cv.path).catch(() => undefined);
    if (applicationPersisted) {
      await serviceFetch(`/rest/v1/applications?id=eq.${encodeURIComponent(applicationId)}`, {
        method: "DELETE",
      }).catch(() => undefined);
      await deleteCv(cv.path).catch(() => undefined);
    }
    throw error;
  }
}
