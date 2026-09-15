import ukOutline from "@/data/uk-outline.json";
import type { LocationItem } from "@/config/locations";

interface LocationMapProps {
  location: LocationItem;
  region: string;
}

// Great Britain mainland outline, simplified from Office for National
// Statistics / Ordnance Survey boundary data (NUTS1 English regions +
// Scottish NUTS2 regions), dissolved to a single ~1,200-point silhouette
// and re-projected here with the same simple equirectangular transform
// used for every location's own coordinates, so the coastline and the
// dot markers always line up. Source data: Crown copyright and database
// right, Office for National Statistics, Ordnance Survey — licensed
// under the Open Government Licence v3.0
// (https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/),
// via https://github.com/martinjc/UK-GeoJSON. Simplified with mapshaper;
// small islands were dropped since this is a decorative locator graphic,
// not a navigational or survey map.
const OUTLINE_RING: [number, number][] = ukOutline.coordinates[0] as [number, number][];

// Fixed base projection covering the whole outline, computed once from
// the data itself (not hand-tuned), so every location's viewBox crops
// into the same coordinate space as the coastline.
const BASE_WIDTH = 1000;
const outlineLons = OUTLINE_RING.map(([lon]) => lon);
const outlineLats = OUTLINE_RING.map(([, lat]) => lat);
const LON_MIN = Math.min(...outlineLons);
const LON_MAX = Math.max(...outlineLons);
const LAT_MIN = Math.min(...outlineLats);
const LAT_MAX = Math.max(...outlineLats);
// Longitude degrees are narrower than latitude degrees away from the
// equator — correct for that at GB's latitude so the silhouette isn't
// stretched.
const LAT_CORRECTION = Math.cos(((LAT_MIN + LAT_MAX) / 2) * (Math.PI / 180));
const BASE_HEIGHT = (BASE_WIDTH / ((LON_MAX - LON_MIN) * LAT_CORRECTION)) * (LAT_MAX - LAT_MIN);

function project([lon, lat]: [number, number]): [number, number] {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * BASE_WIDTH;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * BASE_HEIGHT;
  return [x, y];
}

const OUTLINE_PATH = `M ${OUTLINE_RING.map((point) => project(point).map((n) => n.toFixed(1)).join(",")).join(" L ")} Z`;

/**
 * Branded, decorative UK locator map for a location page. Plain
 * server-rendered SVG — no mapping library or client JavaScript — since
 * this is a visual, not a navigation tool. The coastline is a real,
 * licensed (OGL) simplified silhouette; every location and nearby-place
 * marker is plotted at a genuinely accurate relative position using real
 * public coordinates (see src/config/locations.ts), never estimated.
 *
 * The "zoom" per location is a cropped viewBox into the one fixed base
 * projection above, computed from the current location's and its nearby
 * places' own projected positions — not a per-location manual setting,
 * so it can't drift out of sync with the coordinates. If a future
 * location's automatic crop ever looks wrong, add an explicit
 * `viewBoxOverride` prop rather than hand-tuning the shared projection.
 */
export function LocationMap({ location, region }: LocationMapProps) {
  const current = project([location.coordinates.lon, location.coordinates.lat]);
  const nearby = location.nearbyPlaces.map((place) => ({
    place,
    point: project([place.lon, place.lat]),
  }));

  const xs = [current[0], ...nearby.map((entry) => entry.point[0])];
  const ys = [current[1], ...nearby.map((entry) => entry.point[1])];
  const spanX = Math.max(...xs) - Math.min(...xs);
  const spanY = Math.max(...ys) - Math.min(...ys);
  const padX = Math.max(spanX * 0.55, BASE_WIDTH * 0.05);
  const padY = Math.max(spanY * 0.55, BASE_HEIGHT * 0.05);
  const viewMinX = Math.min(...xs) - padX;
  const viewMinY = Math.min(...ys) - padY;
  const viewWidth = spanX + padX * 2;
  const viewHeight = spanY + padY * 2;

  const titleId = `location-map-title-${location.slug}`;

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-md border border-border-subtle bg-surface-card">
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox={`${viewMinX} ${viewMinY} ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        <title id={titleId}>{`Map showing ${location.title} and nearby cities`}</title>
        <path
          aria-hidden="true"
          d={OUTLINE_PATH}
          fill="color-mix(in srgb, var(--color-success) 14%, var(--color-cream))"
          stroke="var(--color-cream)"
          strokeWidth={viewWidth * 0.006}
        />

        {nearby.map(({ place, point }) => (
          <g key={place.name} aria-hidden="true">
            <circle cx={point[0]} cy={point[1]} r={viewWidth * 0.012} fill="var(--color-navy)" />
            <text
              x={point[0]}
              y={point[1] - viewWidth * 0.022}
              textAnchor="middle"
              fontSize={viewWidth * 0.028}
              fontWeight={600}
              fill="var(--color-navy)"
            >
              {place.name}
            </text>
          </g>
        ))}

        <g aria-hidden="true">
          <circle
            cx={current[0]}
            cy={current[1]}
            r={viewWidth * 0.024}
            fill="var(--color-gold)"
            stroke="var(--color-cream)"
            strokeWidth={viewWidth * 0.006}
          />
          <text
            x={current[0]}
            y={current[1] - viewWidth * 0.038}
            textAnchor="middle"
            fontSize={viewWidth * 0.034}
            fontWeight={700}
            fill="var(--color-navy)"
          >
            {location.title}
          </text>
        </g>
      </svg>

      <div className="pointer-events-none absolute top-4 left-4 max-w-[70%] rounded-sm border border-border-subtle bg-surface-page/95 px-4 py-2 shadow-(--shadow-modal)">
        <p className="text-small font-bold text-navy">
          {location.title} &amp; {region}
        </p>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-4 max-w-[60%] rounded-sm border border-border-subtle bg-surface-page/95 px-4 py-2 text-right shadow-(--shadow-modal)">
        <p className="text-caption text-text-secondary">Supporting businesses across {region}.</p>
      </div>

      <p className="sr-only">
        {`Locations shown on this map: ${location.title} (main office coverage area), ${location.nearbyPlaces
          .map((place) => place.name)
          .join(", ")}.`}
      </p>

      <p className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-text-secondary/60">
        Map data: ONS, OS (Open Government Licence)
      </p>
    </div>
  );
}
