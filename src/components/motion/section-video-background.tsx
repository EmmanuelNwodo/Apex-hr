import { ScrollActivatedVideo } from "@/components/motion/scroll-activated-video";
import { cn } from "@/lib/utils";

interface SectionVideoBackgroundProps {
  src: string;
  className?: string;
}

/**
 * Full-bleed, absolutely-positioned video layer for a scroll-activated
 * dark video-background treatment. Render once as the first child of a
 * `relative isolate overflow-hidden` wrapper that spans every section
 * meant to share this one continuous video (no per-section video
 * instances, so there's no seam or restart where sections meet); each
 * individual section inside should render with a transparent background
 * so the shared video shows through. Playback only starts once scrolled
 * into view — see ScrollActivatedVideo.
 *
 * Deliberately has no darkening scrim (removed per explicit request) — the
 * light content placed on top (e.g. `SectionHeading tone="dark"`) relies
 * entirely on the video's own footage for contrast, so re-check WCAG AA
 * text contrast against the actual approved video before this ships.
 */
export function SectionVideoBackground({ src, className }: SectionVideoBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      <ScrollActivatedVideo src={src} className="h-full w-full object-cover" />
    </div>
  );
}
