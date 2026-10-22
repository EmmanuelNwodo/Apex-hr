import { siteConfig } from "@/config/site";
import { ApplicationServiceError, submitJobApplication } from "@/features/jobs/application-service";

export const runtime = "nodejs";

function requestOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(siteConfig.productionUrl).origin;
  } catch {
    return false;
  }
}

function getTrustedClientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "";
}

export async function POST(request: Request): Promise<Response> {
  if (!requestOriginAllowed(request.headers.get("origin"))) {
    return Response.json({ success: false, code: "origin-not-allowed", message: "Refresh the page and try again." }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ success: false, code: "invalid-form", message: "Check the application fields and try again." }, { status: 400 });
  }

  try {
    const result = await submitJobApplication(formData, getTrustedClientIp(request));
    return Response.json({ success: true, ...result }, { status: result.duplicate ? 200 : 201 });
  } catch (error) {
    if (error instanceof ApplicationServiceError) {
      return Response.json(
        { success: false, code: error.code, message: error.message },
        { status: error.status },
      );
    }
    console.error("[job-applications] unexpected submission failure");
    return Response.json(
      { success: false, code: "submission-failed", message: "We could not submit your application. Please try again." },
      { status: 500 },
    );
  }
}
