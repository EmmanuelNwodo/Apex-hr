/**
 * Maps a sector slug to its approved photo in public/images. A sector left
 * out of this map has no approved photo yet — consumers (e.g. SectorCard)
 * should fall back to a plain text tile rather than a placeholder stock
 * image. Shared by the homepage's featured-sectors marquee and the
 * per-location "sectors we support" cards.
 */
export const sectorImages: Record<string, string> = {
  "startups-scale-ups": "/images/startup.jpg",
  "professional-services": "/images/professional-services.png",
  "health-care": "/images/healthcare.png",
  technology: "/images/IT.png",
  construction: "/images/construction.png",
  distribution: "/images/distribution.png",
  manufacturers: "/images/manufacturing.png",
  hospitality: "/images/hospitality.png",
};
