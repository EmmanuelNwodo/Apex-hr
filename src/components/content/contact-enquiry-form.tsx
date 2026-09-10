"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

type PurposeId = "hiring" | "hr-support" | "candidate";

interface PurposeOption {
  id: PurposeId;
  label: string;
  legendReason: string;
  defaultTopic: string;
}

const purposeOptions: PurposeOption[] = [
  { id: "hiring", label: "I need to hire", legendReason: "Hiring support", defaultTopic: "Recruitment & talent acquisition" },
  { id: "hr-support", label: "I need HR support", legendReason: "HR support", defaultTopic: "Outsourced HR support" },
  { id: "candidate", label: "I'm a candidate", legendReason: "Candidate enquiry", defaultTopic: "Candidate support" },
];

const roleFieldByPurpose: Record<PurposeId, { label: string; placeholder: string } | null> = {
  hiring: { label: "Role you are hiring for", placeholder: "e.g. HR Manager, Software Engineer" },
  "hr-support": null,
  candidate: { label: "Role you are applying for", placeholder: "e.g. HR Manager, Software Engineer" },
};

const topicOptions = [
  "Recruitment & talent acquisition",
  "Outsourced HR support",
  "Employment law & employee relations",
  "Compensation, reward & benefits",
  "Learning & leadership development",
  "Strategic HR & workforce advisory",
  "Candidate support",
];

const inputClasses =
  "rounded-md border border-border-subtle bg-surface-page px-3 py-2.5 text-body text-navy outline-none transition-colors duration-(--duration-fast) focus-visible:border-navy";

/**
 * Contact page enquiry form, adapted from the approved reference layout,
 * also embedded (via FaqWithContactForm) beside every other FAQ section
 * site-wide. The purpose tabs are genuine client-side behaviour (they
 * change the default topic, show/hide the Company field, and swap or hide
 * the Role field's label — "Role you are hiring for" for I need to hire,
 * "Role you are applying for" for I'm a candidate, hidden entirely for I
 * need HR support, where neither framing fits), but there is no backend,
 * CRM adapter or server validation anywhere in this codebase yet — the
 * real submission pipeline described in CLAUDE.md section 13 is later
 * phase work. Rather than faking a "your enquiry has been sent" success
 * state with nowhere for the data to go, submitting composes a real
 * mailto: to Apex HR's confirmed address and tells the visitor exactly
 * what just happened, so the form stays honest and still useful.
 *
 * The "I'm a candidate" purpose additionally shows a CV upload field.
 * A mailto: link cannot carry a file attachment, so the selected file is
 * never silently dropped: its name is included in the emailed body and the
 * confirmation message explicitly tells the candidate to attach the file
 * themselves before sending, once a real upload pipeline (CLAUDE.md
 * section 13/20 — private storage, signed URLs, server-side validation)
 * exists.
 */
export function ContactEnquiryForm() {
  const [purposeId, setPurposeId] = useState<PurposeId>("hiring");
  const [topic, setTopic] = useState(purposeOptions[0].defaultTopic);
  const [status, setStatus] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  const activePurpose = purposeOptions.find((option) => option.id === purposeId) ?? purposeOptions[0];
  const showCompany = purposeId !== "candidate";
  const showCvUpload = purposeId === "candidate";
  const roleField = roleFieldByPurpose[purposeId];

  function selectPurpose(option: PurposeOption) {
    setPurposeId(option.id);
    setTopic(option.defaultTopic);
    if (option.id !== "candidate") {
      setCvFile(null);
      setCvError(null);
    }
  }

  function handleCvChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setCvFile(null);
      setCvError(null);
      return;
    }

    const hasAcceptedExtension = ACCEPTED_CV_EXTENSIONS.some((extension) =>
      file.name.toLowerCase().endsWith(extension),
    );
    if (!hasAcceptedExtension) {
      setCvFile(null);
      setCvError("Please upload a PDF, DOC or DOCX file.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_CV_SIZE_BYTES) {
      setCvFile(null);
      setCvError("That file is larger than 10MB. Please upload a smaller file.");
      event.target.value = "";
      return;
    }

    setCvFile(file);
    setCvError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const company = showCompany ? String(data.get("company") ?? "").trim() : "";
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const bodyLines = [
      `Reason for enquiry: ${activePurpose.legendReason}`,
      `Topic: ${topic}`,
      `Name: ${name}`,
      role && `Role: ${role}`,
      company && `Company: ${company}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      whatsapp && `WhatsApp: ${whatsapp}`,
      showCvUpload && cvFile && `CV file to attach: ${cvFile.name}`,
      "",
      message,
    ].filter((line): line is string => Boolean(line));

    const subject = `Website enquiry: ${topic}`;
    const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
    setStatus(
      showCvUpload && cvFile
        ? `Your email app should now open with this enquiry addressed to Apex HR. Please attach ${cvFile.name} to that email yourself before sending — it can't be attached automatically. If your email app doesn't open, email ${siteConfig.contactEmail} directly and attach your CV there.`
        : `Your email app should now open with this enquiry addressed to Apex HR. If it doesn't open, email ${siteConfig.contactEmail} directly.`,
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-md border border-border-subtle bg-surface-card p-6 sm:p-8">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-body-lg font-semibold text-navy">I&apos;m contacting Apex HR because&hellip;</legend>
        <div role="group" aria-label="Reason for enquiry" className="flex flex-wrap gap-2">
          {purposeOptions.map((option) => {
            const isActive = option.id === purposeId;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectPurpose(option)}
                className={cn(
                  "rounded-full border px-4 py-2 text-small font-semibold transition-colors duration-(--duration-fast)",
                  isActive
                    ? "border-navy bg-navy text-white"
                    : "border-border-subtle bg-surface-page text-navy hover:border-navy",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-small font-semibold text-navy">
            Your name
          </label>
          <input id="contact-name" name="name" type="text" required placeholder="Full name" className={inputClasses} />
        </div>

        {roleField && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-role" className="text-small font-semibold text-navy">
              {roleField.label}
            </label>
            <input
              id="contact-role"
              name="role"
              type="text"
              placeholder={roleField.placeholder}
              className={inputClasses}
            />
          </div>
        )}

        {showCompany && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-company" className="text-small font-semibold text-navy">
              Company
            </label>
            <input id="contact-company" name="company" type="text" placeholder="Organisation name" className={inputClasses} />
          </div>
        )}

        {showCvUpload && (
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="contact-cv" className="text-small font-semibold text-navy">
              Upload your CV <span className="font-normal text-text-secondary">(optional)</span>
            </label>
            <input
              id="contact-cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvChange}
              aria-describedby="contact-cv-hint"
              className={cn(
                inputClasses,
                "file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-small file:font-semibold file:text-white",
              )}
            />
            <p id="contact-cv-hint" className="text-small text-text-secondary">
              PDF, DOC or DOCX, up to 10MB. A mailto link can&apos;t attach files automatically, so
              we&apos;ll remind you to attach it yourself before sending.
            </p>
            {cvError && (
              <p role="alert" className="text-small text-error">
                {cvError}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-small font-semibold text-navy">
            Email address
          </label>
          <input id="contact-email" name="email" type="email" required placeholder="you@company.com" className={inputClasses} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-phone" className="text-small font-semibold text-navy">
            Phone number
          </label>
          <input id="contact-phone" name="phone" type="tel" placeholder="Your preferred number" className={inputClasses} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-whatsapp" className="text-small font-semibold text-navy">
            WhatsApp number
          </label>
          <input
            id="contact-whatsapp"
            name="whatsapp"
            type="tel"
            placeholder="If different from your phone number"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="contact-topic" className="text-small font-semibold text-navy">
            How can we help?
          </label>
          <select
            id="contact-topic"
            name="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className={inputClasses}
          >
            {topicOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="contact-message" className="text-small font-semibold text-navy">
            A little context
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder="Tell us about the challenge, role or support you need&hellip;"
            className={cn(inputClasses, "resize-y")}
          />
        </div>
      </div>

      <label className="flex items-start gap-3 text-small text-text-secondary">
        <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-navy" />
        <span>I agree that Apex HR may use these details to respond to my enquiry in line with its privacy policy.</span>
      </label>

      <button
        type="submit"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 text-body font-bold text-navy transition-transform duration-(--duration-fast) hover:scale-[1.02]"
      >
        Send my enquiry
        <Send aria-hidden="true" className="h-4 w-4" />
      </button>

      <div aria-live="polite" className="min-h-6 text-small text-text-secondary">
        {status}
      </div>
    </form>
  );
}
