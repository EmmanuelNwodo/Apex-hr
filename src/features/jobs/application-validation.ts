import { z } from "zod";

export const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;
export const JOB_APPLICATION_CONSENT_VERSION = "job-application-v1";

export const applicationFormSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name.").max(80),
  lastName: z.string().trim().min(1, "Enter your last name.").max(80),
  email: z.email("Enter a valid email address.").max(254),
  phone: z.string().trim().min(5, "Enter a phone number.").max(40),
  linkedin: z
    .union([z.literal(""), z.url("Enter a valid LinkedIn profile URL.")])
    .refine((value) => !value || /^https:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(value), "Use a LinkedIn profile URL."),
  coverLetter: z.string().max(5000, "Keep the supporting statement under 5,000 characters."),
  message: z.string().max(3000, "Keep the message under 3,000 characters."),
  privacyConsent: z.boolean().refine(Boolean, "Consent is required to submit your application."),
  cv: z.custom<FileList>(
    (files) => typeof FileList !== "undefined" && files instanceof FileList && files.length === 1,
    "Upload your CV or résumé.",
  ),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export const applicationFieldsSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.email().max(254),
  phone: z.string().trim().min(5).max(40),
  linkedin: z
    .union([z.literal(""), z.url()])
    .refine((value) => !value || /^https:\/\/([a-z0-9-]+\.)?linkedin\.com\//i.test(value)),
  coverLetter: z.string().max(5000),
  message: z.string().max(3000),
});

const acceptedFiles = {
  ".pdf": {
    mime: "application/pdf",
    signature: (bytes: Uint8Array) => bytes.length >= 5 && new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-",
  },
  ".doc": {
    mime: "application/msword",
    signature: (bytes: Uint8Array) =>
      bytes.length >= 8 &&
      bytes[0] === 0xd0 &&
      bytes[1] === 0xcf &&
      bytes[2] === 0x11 &&
      bytes[3] === 0xe0 &&
      bytes[4] === 0xa1 &&
      bytes[5] === 0xb1 &&
      bytes[6] === 0x1a &&
      bytes[7] === 0xe1,
  },
  ".docx": {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    signature: (bytes: Uint8Array) => bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04,
  },
} as const;

export type CvValidationError = "cv-too-large" | "cv-extension" | "cv-mime" | "cv-signature" | "cv-empty";

export async function validateCvFile(file: File): Promise<CvValidationError | null> {
  if (file.size <= 0) return "cv-empty";
  if (file.size > MAX_CV_SIZE_BYTES) return "cv-too-large";

  const extension = file.name.toLowerCase().match(/\.(pdf|docx?)$/)?.[0] as keyof typeof acceptedFiles | undefined;
  if (!extension) return "cv-extension";

  const accepted = acceptedFiles[extension];
  if (file.type !== accepted.mime) return "cv-mime";
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  if (!accepted.signature(bytes)) return "cv-signature";
  return null;
}

export function safeFileExtension(fileName: string): ".pdf" | ".doc" | ".docx" {
  return fileName.toLowerCase().endsWith(".docx")
    ? ".docx"
    : fileName.toLowerCase().endsWith(".doc")
      ? ".doc"
      : ".pdf";
}
