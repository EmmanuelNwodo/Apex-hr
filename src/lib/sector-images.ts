/**
 * Maps a sector slug to its approved photo in public/images. A sector left
 * out of this map has no approved photo yet — consumers (e.g. SectorCard)
 * should fall back to a plain text tile rather than a placeholder stock
 * image. Shared by the homepage's featured-sectors marquee and the
 * per-location "sectors we support" cards.
 */
export const sectorImages: Record<string, string> = {
  "hr-company-for-startups-and-scale-ups-in-the-uk": "/images/startup.jpg",
  "hr-company-for-professional-services-in-the-uk": "/images/professional-services.png",
  "hr-company-for-healthcare-in-the-uk": "/images/healthcare.png",
  "hr-company-for-it-in-the-uk": "/images/IT.png",
  "hr-company-for-construction-in-the-uk": "/images/construction.png",
  "hr-company-for-distribution-in-the-uk": "/images/distribution.png",
  "hr-company-for-manufacturers-in-the-uk": "/images/manufacturing.png",
  "hr-company-for-hospitality-in-the-uk": "/images/hospitality.png",
};
