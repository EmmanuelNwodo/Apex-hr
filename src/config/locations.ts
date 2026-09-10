/**
 * Canonical location taxonomy. Source of truth: docs/MASTER-SITEMAP.md
 * section 9 and docs/URL-DECISION-REGISTER.md D-004. Nottingham, Worcester
 * and Staffordshire use the corrected spellings — the legacy misspelled
 * URLs (nothingham, worchester, standfordshire) are redirect sources only,
 * implemented in src/config/redirects.ts, never published as pages.
 */

export interface NearbyPlace {
  name: string;
  lat: number;
  lon: number;
}

export interface LocationItem {
  slug: string;
  title: string;
  /**
   * Approximate real-world coordinates (standard public geography, not
   * business data) used to plot each location's position on the
   * decorative locator map on its page — see
   * src/components/locations/LocationMap.tsx. Precision is deliberately
   * low (town/county-centre level); this is not survey-grade data and
   * implies no specific address or office.
   *
   * To add a future location: add its entry here with real approximate
   * coordinates and 2-4 genuinely nearby real places, then add its
   * content record in src/content/locations-data.ts. Nothing else needs
   * updating — LocationMap and LocationContextSection read every location
   * from this one file.
   */
  coordinates: { lat: number; lon: number };
  /** 2-4 genuinely nearby real towns/cities — not necessarily other Apex HR location pages (e.g. Chester isn't one of ours, but is a real Manchester neighbour). */
  nearbyPlaces: NearbyPlace[];
}

export const locations: LocationItem[] = [
  {
    slug: "london",
    title: "London",
    coordinates: { lat: 51.51, lon: -0.13 },
    nearbyPlaces: [
      { name: "Reading", lat: 51.454, lon: -0.973 },
      { name: "Watford", lat: 51.656, lon: -0.396 },
      { name: "Guildford", lat: 51.236, lon: -0.57 },
    ],
  },
  {
    slug: "manchester",
    title: "Manchester",
    coordinates: { lat: 53.48, lon: -2.24 },
    nearbyPlaces: [
      { name: "Liverpool", lat: 53.4084, lon: -2.9916 },
      { name: "Chester", lat: 53.1934, lon: -2.8931 },
      { name: "Leeds", lat: 53.8008, lon: -1.5491 },
    ],
  },
  {
    slug: "birmingham",
    title: "Birmingham",
    coordinates: { lat: 52.48, lon: -1.9 },
    nearbyPlaces: [
      { name: "Coventry", lat: 52.4068, lon: -1.5197 },
      { name: "Wolverhampton", lat: 52.5862, lon: -2.1281 },
      { name: "Solihull", lat: 52.4118, lon: -1.7776 },
    ],
  },
  {
    slug: "leeds",
    title: "Leeds",
    coordinates: { lat: 53.8, lon: -1.55 },
    nearbyPlaces: [
      { name: "Bradford", lat: 53.796, lon: -1.7594 },
      { name: "Wakefield", lat: 53.6833, lon: -1.4977 },
      { name: "Huddersfield", lat: 53.6458, lon: -1.785 },
    ],
  },
  {
    slug: "bristol",
    title: "Bristol",
    coordinates: { lat: 51.45, lon: -2.59 },
    nearbyPlaces: [
      { name: "Bath", lat: 51.3811, lon: -2.359 },
      { name: "Gloucester", lat: 51.8642, lon: -2.238 },
      { name: "Cardiff", lat: 51.4816, lon: -3.1791 },
    ],
  },
  {
    slug: "edinburgh",
    title: "Edinburgh",
    coordinates: { lat: 55.95, lon: -3.19 },
    nearbyPlaces: [
      { name: "Glasgow", lat: 55.8642, lon: -4.2518 },
      { name: "Dunfermline", lat: 56.0719, lon: -3.452 },
      { name: "Livingston", lat: 55.9033, lon: -3.5228 },
    ],
  },
  {
    slug: "glasgow",
    title: "Glasgow",
    coordinates: { lat: 55.86, lon: -4.25 },
    nearbyPlaces: [
      { name: "Edinburgh", lat: 55.9533, lon: -3.1883 },
      { name: "Paisley", lat: 55.8456, lon: -4.4239 },
      { name: "East Kilbride", lat: 55.7642, lon: -4.177 },
    ],
  },
  {
    slug: "nottingham",
    title: "Nottingham",
    coordinates: { lat: 52.95, lon: -1.15 },
    nearbyPlaces: [
      { name: "Derby", lat: 52.9225, lon: -1.4746 },
      { name: "Leicester", lat: 52.6369, lon: -1.1398 },
      { name: "Mansfield", lat: 53.1472, lon: -1.1988 },
    ],
  },
  {
    slug: "newcastle",
    title: "Newcastle",
    coordinates: { lat: 54.97, lon: -1.61 },
    nearbyPlaces: [
      { name: "Sunderland", lat: 54.9061, lon: -1.3814 },
      { name: "Durham", lat: 54.7761, lon: -1.5733 },
      { name: "Gateshead", lat: 54.9526, lon: -1.6034 },
    ],
  },
  {
    slug: "warwickshire",
    title: "Warwickshire",
    coordinates: { lat: 52.28, lon: -1.59 },
    nearbyPlaces: [
      { name: "Coventry", lat: 52.4068, lon: -1.5197 },
      { name: "Leamington Spa", lat: 52.2854, lon: -1.5352 },
      { name: "Stratford-upon-Avon", lat: 52.1917, lon: -1.7073 },
    ],
  },
  {
    slug: "worcester",
    title: "Worcester",
    coordinates: { lat: 52.19, lon: -2.22 },
    nearbyPlaces: [
      { name: "Birmingham", lat: 52.4862, lon: -1.8904 },
      { name: "Cheltenham", lat: 51.8994, lon: -2.0783 },
      { name: "Hereford", lat: 52.0567, lon: -2.716 },
    ],
  },
  {
    slug: "yorkshire",
    title: "Yorkshire",
    coordinates: { lat: 53.96, lon: -1.08 },
    nearbyPlaces: [
      { name: "Leeds", lat: 53.8008, lon: -1.5491 },
      { name: "Harrogate", lat: 53.9919, lon: -1.5379 },
      { name: "Hull", lat: 53.7457, lon: -0.3367 },
    ],
  },
  {
    slug: "staffordshire",
    title: "Staffordshire",
    coordinates: { lat: 52.81, lon: -2.12 },
    nearbyPlaces: [
      { name: "Stoke-on-Trent", lat: 53.0027, lon: -2.1794 },
      { name: "Wolverhampton", lat: 52.5862, lon: -2.1281 },
      { name: "Lichfield", lat: 52.6825, lon: -1.8262 },
    ],
  },
  {
    slug: "liverpool",
    title: "Liverpool",
    coordinates: { lat: 53.41, lon: -2.98 },
    nearbyPlaces: [
      { name: "Manchester", lat: 53.4808, lon: -2.2426 },
      { name: "Chester", lat: 53.1934, lon: -2.8931 },
      { name: "Warrington", lat: 53.39, lon: -2.597 },
    ],
  },
  {
    slug: "oxford",
    title: "Oxford",
    coordinates: { lat: 51.75, lon: -1.26 },
    nearbyPlaces: [
      { name: "Reading", lat: 51.4543, lon: -0.9781 },
      { name: "Swindon", lat: 51.5558, lon: -1.7797 },
      { name: "Banbury", lat: 52.0629, lon: -1.3398 },
    ],
  },
  {
    slug: "leicester",
    title: "Leicester",
    coordinates: { lat: 52.64, lon: -1.13 },
    nearbyPlaces: [
      { name: "Nottingham", lat: 52.9548, lon: -1.1581 },
      { name: "Coventry", lat: 52.4068, lon: -1.5197 },
      { name: "Derby", lat: 52.9225, lon: -1.4746 },
    ],
  },
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}
