import { FileText } from "lucide-react";

interface EmptyEditorialStateProps {
  message: string;
}

/**
 * Honest empty/editorial-preview state for content families with no
 * verified entries yet (case studies, experts, insights). Used instead of
 * fabricating placeholder people, results or articles — see CLAUDE.md
 * section 2 and DESIGN.md section 19.2.
 */
export function EmptyEditorialState({ message }: EmptyEditorialStateProps) {
  return (
    <div className="flex flex-col items-start gap-3 border border-dashed border-border-strong p-8">
      <FileText aria-hidden="true" className="h-6 w-6 text-text-secondary" />
      <p className="max-w-[var(--container-reading)] text-body italic text-text-secondary">
        {message}
      </p>
    </div>
  );
}
