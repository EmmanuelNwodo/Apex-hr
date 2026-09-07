import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doesn't know about this project's custom named font-size
 * scale (src/styles/tokens.css / globals.css `@theme inline`) — by
 * default it treats an unrecognised `text-h1`-style class as a `text-color`
 * candidate, so combining e.g. `text-h1` with `text-navy` in the same
 * `cn()` call silently drops the size class instead of keeping both. This
 * extension tells it these are font-size utilities so it dedupes/merges
 * them correctly against each other without colliding with text colour.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-xl",
        "text-display",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-lead",
        "text-body-lg",
        "text-body",
        "text-small",
        "text-caption",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
