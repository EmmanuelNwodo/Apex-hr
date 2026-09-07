import type { ProcessStepContent } from "@/content/home";

interface ProcessStepProps {
  item: ProcessStepContent;
}

/**
 * Single step in the "How Apex works" sequence. The hover/focus emphasis
 * uses a transform-only, compositor-friendly transition (DESIGN.md 21.5)
 * and is automatically neutralised for prefers-reduced-motion by the
 * global rule in src/app/globals.css.
 */
export function ProcessStep({ item }: ProcessStepProps) {
  return (
    <li className="border-t border-white/20 pt-5 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-1 focus-within:-translate-y-1">
      <span className="font-display text-h4 font-bold text-gold">{item.step}</span>
      <h3 className="mt-2 font-display text-h4 font-bold text-white">{item.title}</h3>
      <p className="mt-2 text-body text-white/75">{item.detail}</p>
    </li>
  );
}
