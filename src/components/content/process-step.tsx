import type { ProcessStepContent } from "@/content/home";

interface ProcessStepProps {
  item: ProcessStepContent;
}

/**
 * Single step's content in the "How Apex works" sequence — the `<li>`
 * itself (and its hover/focus emphasis classes) is owned by the caller
 * (see ProcessSection), since the caller also wraps each step in a
 * StaggerItem that must render the actual `<li>` element for valid
 * list markup. The hover/focus emphasis uses a transform-only,
 * compositor-friendly transition (DESIGN.md 21.5) and is automatically
 * neutralised for prefers-reduced-motion by the global rule in
 * src/app/globals.css.
 */
export function ProcessStep({ item }: ProcessStepProps) {
  return (
    <>
      <span className="font-display text-h4 font-bold text-gold">{item.step}</span>
      <h3 className="mt-2 font-display text-h4 font-bold text-white">{item.title}</h3>
      <p className="mt-2 text-body text-white/75">{item.detail}</p>
    </>
  );
}
