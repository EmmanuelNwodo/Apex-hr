/**
 * Visible marker for development placeholder content. Used on stub pages
 * and sections where approved copy does not exist yet — never remove this
 * without replacing the surrounding content with real, approved copy.
 */
export function PlaceholderNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[var(--container-reading)] text-body italic text-text-secondary">
      {children}
    </p>
  );
}
