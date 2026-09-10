import { FaqAccordion } from "@/components/content/faq-accordion";
import { ContactEnquiryForm } from "@/components/content/contact-enquiry-form";
import { getFaqPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/content/home";

interface FaqWithContactFormProps {
  items: FaqItem[];
  className?: string;
  /**
   * Set false only for pages excluded from FAQPage schema this batch —
   * currently just the curated service/category + location combination
   * pages (SEO audit Batch 2 item 3: "Do not add schema to the disputed
   * location-combination pages in this batch"). Every other consumer gets
   * real FAQPage JSON-LD for free, generated from the exact same `items`
   * array rendered below, so the schema can never drift from what's
   * visible.
   */
  includeSchema?: boolean;
}

/**
 * FAQ accordion paired with the same enquiry form used on the Contact
 * page, so a visitor with an unanswered question can act immediately
 * instead of navigating away to /contact/. Used on every other page that
 * has an FAQ section — the Contact page itself already has this form
 * higher up the page, so it renders its FAQ accordion alone.
 */
export function FaqWithContactForm({ items, className, includeSchema = true }: FaqWithContactFormProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start", className)}>
      {includeSchema && items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLdScript(getFaqPageJsonLd({ faqs: items })) }}
        />
      )}
      <FaqAccordion items={items} />
      <ContactEnquiryForm />
    </div>
  );
}
