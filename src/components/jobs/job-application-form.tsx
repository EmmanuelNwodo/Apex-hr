"use client";

import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  applicationFormSchema,
  MAX_CV_SIZE_BYTES,
  type ApplicationFormValues,
} from "@/features/jobs/application-validation";
import type { Vacancy } from "@/lib/wordpress";
import { TurnstileControl } from "./turnstile-control";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={`${id}-error`} className="text-small text-red-800">{message}</p> : null;
}

function inputClassName(invalid: boolean) {
  return `min-h-12 rounded-md border bg-white px-3 text-body text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
    invalid ? "border-red-700" : "border-border-subtle"
  }`;
}

export function JobApplicationForm({ vacancy }: { vacancy: Vacancy }) {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedin: "",
      coverLetter: "",
      message: "",
      privacyConsent: false,
    },
  });

  const verifyTurnstile = useCallback((token: string) => setTurnstileToken(token), []);

  const submitApplication = handleSubmit(async (values) => {
    setSubmissionMessage("");
    setSubmissionError("");
    if (!turnstileToken) {
      setSubmissionError("Complete the security check before submitting your application.");
      return;
    }

    const submissionKey = idempotencyKey ?? crypto.randomUUID();
    if (!idempotencyKey) setIdempotencyKey(submissionKey);
    const formData = new FormData();
    formData.set("firstName", values.firstName);
    formData.set("lastName", values.lastName);
    formData.set("email", values.email);
    formData.set("phone", values.phone);
    formData.set("linkedin", values.linkedin);
    formData.set("coverLetter", values.coverLetter);
    formData.set("message", values.message);
    formData.set("privacyConsent", "true");
    formData.set("cv", values.cv[0]);
    formData.set("turnstileToken", turnstileToken);
    formData.set("idempotencyKey", submissionKey);
    formData.set("vacancySlug", vacancy.slug);
    formData.set("sourcePath", window.location.pathname);
    formData.set("attribution", JSON.stringify(getAttribution()));

    try {
      const response = await fetch("/api/job-applications/", { method: "POST", body: formData });
      const result = await response.json() as { success?: boolean; message?: string; code?: string };
      if (!response.ok || !result.success) {
        setSubmissionError(result.message || "We could not submit your application. Please check your details and try again.");
        return;
      }
      setSubmissionMessage("Thank you for applying. Your application has been received, and the Apex HR team will contact you if your experience matches the role.");
      reset();
      setTurnstileToken("");
      setIdempotencyKey(null);
    } catch {
      setSubmissionError(`We could not reach the application service. Your details have not been confirmed as received. You can contact Apex HR at ${siteConfig.contactEmail}.`);
    }
  });

  return (
    <section id="apply" aria-labelledby="application-form-title" className="scroll-mt-28 rounded-md border border-border-subtle bg-surface-card p-6 sm:p-8">
      <h2 id="application-form-title" className="font-display text-h3 font-bold text-navy">Apply for This Role</h2>
      <p className="mt-2 text-body text-text-secondary">
        Share your details and CV to apply for {vacancy.title}.
      </p>
      <form onSubmit={submitApplication} noValidate className="mt-6 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="application-first-name" className="flex flex-col gap-2 text-small font-semibold text-navy">
            First name
            <input id="application-first-name" autoComplete="given-name" className={inputClassName(Boolean(errors.firstName))} aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "application-first-name-error" : undefined} {...register("firstName")} />
            <FieldError id="application-first-name" message={errors.firstName?.message} />
          </label>
          <label htmlFor="application-last-name" className="flex flex-col gap-2 text-small font-semibold text-navy">
            Last name
            <input id="application-last-name" autoComplete="family-name" className={inputClassName(Boolean(errors.lastName))} aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "application-last-name-error" : undefined} {...register("lastName")} />
            <FieldError id="application-last-name" message={errors.lastName?.message} />
          </label>
          <label htmlFor="application-email" className="flex flex-col gap-2 text-small font-semibold text-navy">
            Email address
            <input id="application-email" type="email" autoComplete="email" className={inputClassName(Boolean(errors.email))} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "application-email-error" : undefined} {...register("email")} />
            <FieldError id="application-email" message={errors.email?.message} />
          </label>
          <label htmlFor="application-phone" className="flex flex-col gap-2 text-small font-semibold text-navy">
            Phone number
            <input id="application-phone" type="tel" autoComplete="tel" className={inputClassName(Boolean(errors.phone))} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "application-phone-error" : undefined} {...register("phone")} />
            <FieldError id="application-phone" message={errors.phone?.message} />
          </label>
        </div>

        <label htmlFor="application-linkedin" className="flex flex-col gap-2 text-small font-semibold text-navy">
          LinkedIn profile <span className="font-normal text-text-secondary">(optional)</span>
          <input id="application-linkedin" type="url" placeholder="https://www.linkedin.com/in/…" className={inputClassName(Boolean(errors.linkedin))} aria-invalid={Boolean(errors.linkedin)} aria-describedby={errors.linkedin ? "application-linkedin-error" : undefined} {...register("linkedin")} />
          <FieldError id="application-linkedin" message={errors.linkedin?.message} />
        </label>

        <label htmlFor="application-cv" className="flex flex-col gap-2 text-small font-semibold text-navy">
          Upload CV / Résumé <span className="font-normal text-text-secondary">PDF, DOC or DOCX · up to 5 MB</span>
          <input
            id="application-cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={`${inputClassName(Boolean(errors.cv))} py-2`}
            aria-invalid={Boolean(errors.cv)}
            aria-describedby={errors.cv ? "application-cv-error" : "application-cv-help"}
            {...register("cv")}
          />
          <span id="application-cv-help" className="font-normal text-text-secondary">Maximum file size: {MAX_CV_SIZE_BYTES / (1024 * 1024)} MB.</span>
          <FieldError id="application-cv" message={errors.cv?.message} />
        </label>

        <label htmlFor="application-cover-letter" className="flex flex-col gap-2 text-small font-semibold text-navy">
          Cover letter or supporting statement <span className="font-normal text-text-secondary">(optional)</span>
          <textarea id="application-cover-letter" rows={4} className="rounded-md border border-border-subtle bg-white px-3 py-2.5 text-body text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy" {...register("coverLetter")} />
          <FieldError id="application-cover-letter" message={errors.coverLetter?.message} />
        </label>

        <label htmlFor="application-message" className="flex flex-col gap-2 text-small font-semibold text-navy">
          Additional message <span className="font-normal text-text-secondary">(optional)</span>
          <textarea id="application-message" rows={3} className="rounded-md border border-border-subtle bg-white px-3 py-2.5 text-body text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy" {...register("message")} />
          <FieldError id="application-message" message={errors.message?.message} />
        </label>

        <div>
          <label htmlFor="application-consent" className="flex items-start gap-3 text-small text-text-secondary">
            <input id="application-consent" type="checkbox" className="mt-1 h-4 w-4 accent-navy" aria-invalid={Boolean(errors.privacyConsent)} aria-describedby={errors.privacyConsent ? "application-consent-error" : undefined} {...register("privacyConsent")} />
            <span>I have read the <Link href="/privacy-policy/" className="font-semibold text-navy underline underline-offset-4">Privacy Policy</Link> and consent to Apex HR processing my information to consider this application.</span>
          </label>
          <FieldError id="application-consent" message={errors.privacyConsent?.message} />
        </div>

        <div aria-describedby="application-security-help">
          <TurnstileControl siteKey={TURNSTILE_SITE_KEY} onVerify={verifyTurnstile} />
          <p id="application-security-help" className="sr-only">Complete the security check to submit your application.</p>
        </div>

        <label className="sr-only" aria-hidden="true">
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        {submissionError && <p className="text-body text-red-800" role="alert">{submissionError}</p>}
        {submissionMessage && <p className="text-body font-semibold text-navy" role="status">{submissionMessage}</p>}
        <button
          type="submit"
          disabled={isSubmitting || !TURNSTILE_SITE_KEY}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-navy px-6 font-semibold text-white hover:bg-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting application…" : "Submit Application"}
        </button>
      </form>
    </section>
  );
}

function getAttribution(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const fields = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  return Object.fromEntries(fields.flatMap((field) => {
    const value = params.get(field);
    return value ? [[field, value.slice(0, 200)]] : [];
  }));
}
