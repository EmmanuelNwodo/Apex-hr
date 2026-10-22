import { JOB_APPLICATION_CONSENT_VERSION, applicationFieldsSchema, validateCvFile } from "./application-validation";
import { siteConfig } from "@/config/site";
import { getVacancyBySlug, isVacancyOpen } from "@/lib/wordpress";

const MAX_TEXT_FIELD_LENGTH = 5_000;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

interface ApplicationSubmission {
  idempotencyKey: string;
  vacancyId: number;
  vacancySlug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  coverLetter: string;
  message: string;
  sourcePath: string;
  attribution: Partial<Record<(typeof UTM_FIELDS)[number], string>>;
  cv: File;
}

interface WordPressApplicationResponse {
  success: true;
  data: {
    uuid: string;
    duplicate: boolean;
  };
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

function readAttribution(value: string): ApplicationSubmission["attribution"] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value || "{}");
  } catch {
    throw new ApplicationServiceError("invalid-form", 400, "Refresh the vacancy page and try again.");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new ApplicationServiceError("invalid-form", 400, "Refresh the vacancy page and try again.");
  }

  const attribution: ApplicationSubmission["attribution"] = {};
  for (const [key, item] of Object.entries(parsed)) {
    if (!UTM_FIELDS.includes(key as (typeof UTM_FIELDS)[number])) continue;
    if (typeof item !== "string" || item.length > 255) {
      throw new ApplicationServiceError("invalid-form", 400, "Refresh the vacancy page and try again.");
    }
    attribution[key as (typeof UTM_FIELDS)[number]] = item.trim();
  }
  return attribution;
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
    linkedin: requiredText(formData, "linkedin", 2048),
    coverLetter: requiredText(formData, "coverLetter", 5_000),
    message: requiredText(formData, "message", 3_000),
  });
  if (!fields.success) {
    throw new ApplicationServiceError("invalid-form", 400, "Check the application fields and try again.");
  }

  const idempotencyKey = requiredText(formData, "idempotencyKey", 64);
  if (!UUID_PATTERN.test(idempotencyKey)) {
    throw new ApplicationServiceError("invalid-form", 400, "Refresh the page and try submitting your application again.");
  }

  const vacancyIdValue = requiredText(formData, "vacancyId", 20);
  const vacancyId = Number(vacancyIdValue);
  if (!/^[1-9]\d*$/.test(vacancyIdValue) || !Number.isSafeInteger(vacancyId)) {
    throw new ApplicationServiceError("invalid-vacancy", 409, "This vacancy is no longer accepting applications.");
  }

  const vacancySlug = requiredText(formData, "vacancySlug", 120);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(vacancySlug)) {
    throw new ApplicationServiceError("invalid-vacancy", 409, "This vacancy is no longer accepting applications.");
  }

  const sourcePath = requiredText(formData, "sourcePath", 300);
  if (sourcePath !== `/jobs/${vacancySlug}/`) {
    throw new ApplicationServiceError("invalid-form", 400, "Refresh the vacancy page and try again.");
  }

  return {
    idempotencyKey,
    vacancyId,
    vacancySlug,
    ...fields.data,
    sourcePath,
    attribution: readAttribution(requiredText(formData, "attribution", 2_000)),
    cv: fileValue,
  };
}

async function verifyTurnstile(token: string, ipAddress: string): Promise<void> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ipAddress) body.set("remoteip", ipAddress);
  let response: Response;
  try {
    response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
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

  const expectedHost = new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.productionUrl).hostname.toLowerCase();
  const hostname = "hostname" in result && typeof result.hostname === "string" ? result.hostname.toLowerCase() : "";
  if (hostname !== expectedHost) {
    throw new ApplicationServiceError("security-check-failed", 400, "Complete the security check before submitting your application.");
  }
}

function getWordPressEndpoint(): { url: URL; username: string; password: string } {
  const endpoint = process.env.WORDPRESS_APPLICATIONS_API_URL;
  const username = process.env.WORDPRESS_APPLICATIONS_USERNAME;
  const password = process.env.WORDPRESS_APPLICATIONS_APP_PASSWORD;
  if (!endpoint || !username || !password) {
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !url.pathname.replace(/\/+$/, "").endsWith("/wp-json/apex-hr/v1/applications")
  ) {
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  return { url, username, password: password.replace(/\s/g, "") };
}

async function forwardApplication(submission: ApplicationSubmission): Promise<WordPressApplicationResponse> {
  const { url, username, password } = getWordPressEndpoint();
  const body = new FormData();
  body.set("idempotencyKey", submission.idempotencyKey);
  body.set("vacancyId", String(submission.vacancyId));
  body.set("vacancySlug", submission.vacancySlug);
  body.set("firstName", submission.firstName);
  body.set("lastName", submission.lastName);
  body.set("email", submission.email);
  body.set("phone", submission.phone);
  body.set("linkedin", submission.linkedin);
  body.set("coverLetter", submission.coverLetter);
  body.set("message", submission.message);
  body.set("privacyConsent", "true");
  body.set("consentVersion", JOB_APPLICATION_CONSENT_VERSION);
  body.set("sourceUrl", new URL(submission.sourcePath, siteConfig.productionUrl).toString());
  for (const field of UTM_FIELDS) {
    body.set(field, submission.attribution[field] ?? "");
  }
  body.set("cv", submission.cv, submission.cv.name);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
        "Idempotency-Key": submission.idempotencyKey,
      },
      body,
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
      redirect: "error",
    });
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "TimeoutError";
    throw new ApplicationServiceError(
      isTimeout ? "application-service-timeout" : "service-unavailable",
      503,
      "Applications are temporarily unavailable. Please try again later.",
    );
  }

  if (!response.ok) {
    if (response.status === 409) {
      throw new ApplicationServiceError("vacancy-closed", 409, "This vacancy is no longer accepting applications.");
    }
    if (response.status === 400 || response.status === 415 || response.status === 422) {
      throw new ApplicationServiceError("invalid-form", 400, "Check the application fields and try again.");
    }
    console.error(`[job-applications] WordPress submission failed (${response.status})`);
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  const result: unknown = await response.json().catch(() => null);
  if (
    typeof result !== "object" ||
    result === null ||
    !("success" in result) ||
    result.success !== true ||
    !("data" in result) ||
    typeof result.data !== "object" ||
    result.data === null ||
    !("uuid" in result.data) ||
    typeof result.data.uuid !== "string" ||
    !UUID_PATTERN.test(result.data.uuid) ||
    !("duplicate" in result.data) ||
    typeof result.data.duplicate !== "boolean"
  ) {
    throw new ApplicationServiceError("service-unavailable", 503, "Applications are temporarily unavailable. Please try again later.");
  }

  return {
    success: true,
    data: {
      uuid: result.data.uuid,
      duplicate: result.data.duplicate,
    },
  };
}

export async function submitJobApplication(formData: FormData, ipAddress: string) {
  const submission = parseSubmission(formData);
  const cvError = await validateCvFile(submission.cv);
  if (cvError) {
    const message = cvError === "cv-too-large"
      ? "Your CV must be no larger than 5 MB."
      : cvError === "cv-empty"
        ? "Upload your CV or résumé."
        : "Upload a valid PDF, DOC or DOCX file.";
    throw new ApplicationServiceError(cvError, 400, message);
  }

  const token = requiredText(formData, "turnstileToken", 2_048);
  if (!token) {
    throw new ApplicationServiceError("security-check-failed", 400, "Complete the security check before submitting your application.");
  }
  await verifyTurnstile(token, ipAddress);

  const vacancy = await getVacancyBySlug(submission.vacancySlug);
  if (!vacancy || vacancy.id !== submission.vacancyId || !isVacancyOpen(vacancy)) {
    throw new ApplicationServiceError("vacancy-closed", 409, "This vacancy is no longer accepting applications.");
  }

  const result = await forwardApplication(submission);
  return {
    duplicate: result.data.duplicate,
    applicationId: result.data.uuid,
  };
}
