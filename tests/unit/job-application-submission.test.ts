import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { validateCvFile } from "@/features/jobs/application-validation";
import { POST } from "@/app/api/job-applications/route";

const wordpressMocks = vi.hoisted(() => ({
  getVacancyBySlug: vi.fn(),
  isVacancyOpen: vi.fn(),
}));

vi.mock("@/lib/wordpress", () => wordpressMocks);

import { ApplicationServiceError, submitJobApplication } from "@/features/jobs/application-service";

const idempotencyKey = "e9f00bd2-107c-4ac1-9b62-f021884f5e88";
const applicationUuid = "45b10965-2582-41ce-a83d-71eb747b2fc4";

function buildForm(overrides: Record<string, string | File> = {}) {
  const form = new FormData();
  form.set("firstName", "Alex");
  form.set("lastName", "Taylor");
  form.set("email", "alex@example.test");
  form.set("phone", "+44 7700 900123");
  form.set("linkedin", "");
  form.set("coverLetter", "Relevant experience.");
  form.set("message", "");
  form.set("privacyConsent", "true");
  form.set("website", "");
  form.set("idempotencyKey", idempotencyKey);
  form.set("vacancyId", "42");
  form.set("vacancySlug", "people-partner");
  form.set("sourcePath", "/jobs/people-partner/");
  form.set("attribution", JSON.stringify({ utm_source: "newsletter", utm_campaign: "autumn" }));
  form.set("turnstileToken", "turnstile-test-token");
  form.set("cv", new File(["%PDF-1.7 valid test document"], "candidate.pdf", { type: "application/pdf" }));
  for (const [key, value] of Object.entries(overrides)) form.set(key, value);
  return form;
}

function jsonResponse(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function setupEnvironment() {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.apexhrllc.co.uk");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "turnstile-secret-test");
  vi.stubEnv("WORDPRESS_APPLICATIONS_API_URL", "https://blog.apexhrllc.co.uk/wp-json/apex-hr/v1/applications");
  vi.stubEnv("WORDPRESS_APPLICATIONS_USERNAME", "staging-integration");
  vi.stubEnv("WORDPRESS_APPLICATIONS_APP_PASSWORD", "abcd efgh ijkl mnop");
  wordpressMocks.getVacancyBySlug.mockResolvedValue({ id: 42, slug: "people-partner", status: "open" });
  wordpressMocks.isVacancyOpen.mockReturnValue(true);
}

function mockSuccessfulFetch() {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, requestInit?: RequestInit) => {
    void requestInit;
    if (String(input).includes("challenges.cloudflare.com")) {
      return jsonResponse({ success: true, hostname: "www.apexhrllc.co.uk" });
    }
    return jsonResponse({ success: true, data: { uuid: applicationUuid, duplicate: false } }, 201);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.clearAllMocks();
  setupEnvironment();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("CV validation", () => {
  it("requires a CV and rejects oversized, mismatched, and double-extension files", async () => {
    await expect(validateCvFile(new File([], "empty.pdf", { type: "application/pdf" }))).resolves.toBe("cv-empty");
    await expect(validateCvFile(new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.pdf", { type: "application/pdf" }))).resolves.toBe("cv-too-large");
    await expect(validateCvFile(new File(["%PDF-1.7"], "candidate.pdf", { type: "text/plain" }))).resolves.toBe("cv-mime");
    await expect(validateCvFile(new File(["%PDF-1.7"], "candidate.exe.pdf", { type: "application/pdf" }))).resolves.toBe("cv-extension");
    await expect(validateCvFile(new File(["not a PDF"], "candidate.pdf", { type: "application/pdf" }))).resolves.toBe("cv-signature");
  });

  it("accepts a correctly typed PDF within the size limit", async () => {
    await expect(validateCvFile(new File(["%PDF-1.7"], "candidate.pdf", { type: "application/pdf" }))).resolves.toBeNull();
  });
});

describe("WordPress application submission", () => {
  it("rejects missing CV and invalid form values before any network call", async () => {
    const missingCv = buildForm();
    missingCv.delete("cv");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitJobApplication(missingCv, "")).rejects.toMatchObject({
      code: "cv-required",
      status: 400,
    });
    await expect(submitJobApplication(buildForm({ email: "not-an-email" }), "")).rejects.toBeInstanceOf(ApplicationServiceError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails closed when Turnstile verification fails", async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ success: false }, 200));
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitJobApplication(buildForm(), "")).rejects.toMatchObject({
      code: "security-check-failed",
      status: 400,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns only a safe public error from the Next.js route", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ success: false, "error-codes": ["invalid-input-secret"] })));
    const request = new Request("https://www.apexhrllc.co.uk/api/job-applications/", {
      method: "POST",
      headers: { origin: "https://www.apexhrllc.co.uk" },
    });
    vi.spyOn(request, "formData").mockResolvedValue(buildForm());

    const response = await POST(request);
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result).toMatchObject({
      success: false,
      code: "security-check-failed",
      message: "Complete the security check before submitting your application.",
    });
    expect(JSON.stringify(result)).not.toContain("invalid-input-secret");
  });

  it("reports missing WordPress server credentials without contacting WordPress", async () => {
    vi.stubEnv("WORDPRESS_APPLICATIONS_USERNAME", "");
    const fetchMock = mockSuccessfulFetch();

    await expect(submitJobApplication(buildForm(), "")).rejects.toMatchObject({
      code: "service-unavailable",
      status: 503,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain("challenges.cloudflare.com");
  });

  it("forwards multipart data, authentication and the idempotency UUID without calling Supabase", async () => {
    const fetchMock = mockSuccessfulFetch();

    await expect(submitJobApplication(buildForm(), "")).resolves.toEqual({
      duplicate: false,
      applicationId: applicationUuid,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [endpoint, request] = fetchMock.mock.calls[1]!;
    expect(String(endpoint)).toBe("https://blog.apexhrllc.co.uk/wp-json/apex-hr/v1/applications");
    expect(request?.method).toBe("POST");
    expect(new Headers(request?.headers).get("Idempotency-Key")).toBe(idempotencyKey);
    expect(new Headers(request?.headers).get("Authorization")).toBe(
      `Basic ${Buffer.from("staging-integration:abcdefghijklmnop").toString("base64")}`,
    );
    expect(request?.body).toBeInstanceOf(FormData);
    const body = request?.body as FormData;
    expect(body.get("vacancyId")).toBe("42");
    expect(body.get("vacancySlug")).toBe("people-partner");
    expect(body.get("consentVersion")).toBe("job-application-v1");
    expect(body.get("utm_campaign")).toBe("autumn");
    expect(body.get("cv")).toBeInstanceOf(File);
    expect(fetchMock.mock.calls.every(([url]) => !String(url).includes("supabase"))).toBe(true);
  });

  it("maps WordPress authentication and validation failures to safe candidate messages", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("challenges.cloudflare.com")) {
        return jsonResponse({ success: true, hostname: "www.apexhrllc.co.uk" });
      }
      return jsonResponse({ code: "rest_not_logged_in", message: "secret auth details" }, 401);
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitJobApplication(buildForm(), "")).rejects.toMatchObject({
      code: "service-unavailable",
      status: 503,
      message: "Applications are temporarily unavailable. Please try again later.",
    });
    await expect(submitJobApplication(buildForm(), "")).rejects.not.toThrow("secret auth details");

    fetchMock.mockImplementation(async (input: RequestInfo | URL) => {
      if (String(input).includes("challenges.cloudflare.com")) {
        return jsonResponse({ success: true, hostname: "www.apexhrllc.co.uk" });
      }
      return jsonResponse({ code: "apex_hr_invalid_application", message: "private validation details" }, 422);
    });
    await expect(submitJobApplication(buildForm(), "")).rejects.toMatchObject({
      code: "invalid-form",
      status: 400,
      message: "Check the application fields and try again.",
    });
  });

  it("maps WordPress timeouts to a safe service-unavailable response", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("challenges.cloudflare.com")) {
        return jsonResponse({ success: true, hostname: "www.apexhrllc.co.uk" });
      }
      throw Object.assign(new Error("upstream timeout"), { name: "TimeoutError" });
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitJobApplication(buildForm(), "")).rejects.toMatchObject({
      code: "application-service-timeout",
      status: 503,
      message: "Applications are temporarily unavailable. Please try again later.",
    });
  });

  it("rejects a WordPress vacancy that no longer matches the ID, slug or open state", async () => {
    mockSuccessfulFetch();
    wordpressMocks.getVacancyBySlug.mockResolvedValue({ id: 43, slug: "people-partner", status: "open" });

    await expect(submitJobApplication(buildForm(), "")).rejects.toMatchObject({
      code: "vacancy-closed",
      status: 409,
    });
  });
});
