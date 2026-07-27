import { categoryColorOf } from './holdMeta';

/**
 * Flat side-profile silhouette for each of the 16 hold types: the wall is the
 * vertical bar on the left and the hold protrudes to the right, so the shape
 * that matters (incut lip, dome, hole, standoff gap) is what you actually see.
 * Used wherever a hold needs an inline mark - the sidebar, the comparison strip
 * and the specimen title - because a plain colored dot looks identical for all
 * sixteen types.
 */

interface ShapeProps {
  fill: string;
}

const SHAPES: Record<string, (p: ShapeProps) => React.ReactElement> = {
  // Big positive bucket: mass on top, scooped incut underneath.
  jug: ({ fill }) => (
    <path d="M4 5 C13 5 20 8 20 12 C20 16 14 18.5 9 17.5 C13 15 13 12 9 11 L4 11 Z" fill={fill} />
  ),
  // Thin edge with a shallow incut lip.
  crimp: ({ fill }) => (
    <path d="M4 10 L16 10.8 a1.7 1.7 0 0 1 0 3.2 L4 14.2 Z" fill={fill} />
  ),
  // Edgeless convex dome.
  sloper: ({ fill }) => <path d="M4 19 A9 7.5 0 0 1 4 5 Z" fill={fill} />,
  // Dome pierced by two finger holes.
  pocket: ({ fill }) => (
    <>
      <path d="M4 18 A8 6.5 0 0 1 4 6 Z" fill={fill} />
      <circle cx="10.5" cy="12" r="1.7" fill="#2B2620" opacity="0.85" />
      <circle cx="14.2" cy="12" r="1.7" fill="#2B2620" opacity="0.85" />
    </>
  ),
  // Smaller dome, one finger only.
  mono: ({ fill }) => (
    <>
      <path d="M4 17 A6.5 5.5 0 0 1 4 7 Z" fill={fill} />
      <circle cx="9.6" cy="12" r="1.5" fill="#2B2620" opacity="0.85" />
    </>
  ),
  // Two opposing lobes with a thumb gap.
  pinch: ({ fill }) => (
    <>
      <path d="M4 11 A5.5 4 0 0 1 4 3 Z" fill={fill} />
      <path d="M4 21 A5.5 4 0 0 1 4 13 Z" fill={fill} />
    </>
  ),
  // Jug flipped: the usable lip faces down.
  undercling: ({ fill }) => (
    <path d="M4 19 C13 19 20 16 20 12 C20 8 14 5.5 9 6.5 C13 9 13 12 9 13 L4 13 Z" fill={fill} />
  ),
  // Tall wedge gripped from the side.
  sidepull: ({ fill }) => (
    <path d="M4 4 L13 5.5 a2.2 2.2 0 0 1 0 13 L4 20 Z" fill={fill} />
  ),
  // Long horizontal rail.
  edge: ({ fill }) => (
    <path d="M4 10 L20 10.7 a1.5 1.5 0 0 1 0 2.6 L4 14 Z" fill={fill} />
  ),
  // Large structural feature: a faceted triangular prism.
  volume: ({ fill }) => <path d="M4 3 L20 12 L4 21 Z" fill={fill} />,
  // Small foot dome with a flattened stepping face.
  foothold: ({ fill }) => (
    <path d="M4 9 L10.5 9.8 Q14 12 13 17.2 L4 18 Z" fill={fill} />
  ),
  // Micro foot chip.
  chip: ({ fill }) => <path d="M4 14.5 A3.6 3 0 0 1 4 8.5 Z" fill={fill} />,
  // Big hollow the whole hand fits into.
  hueco: ({ fill }) => (
    <>
      <path d="M4 19 A9 7.5 0 0 1 4 5 Z" fill={fill} />
      <circle cx="11" cy="12" r="3.6" fill="#2B2620" opacity="0.85" />
    </>
  ),
  // Tall knobbly stalactite column.
  tufa: ({ fill }) => (
    <path d="M4 2 L9 3 C12.5 5.5 9 8.5 11 11.5 C13 14.5 9.5 17 10.5 22 L4 22 Z" fill={fill} />
  ),
  // Thin plate standing off the wall, finger gap behind it.
  flake: ({ fill }) => (
    <>
      <path d="M8.5 4 C13.5 8 13.5 16 8.5 20 L11.8 20 C16.5 16 16.5 8 11.8 4 Z" fill={fill} />
      <rect x="4" y="5.6" width="4.6" height="1.9" rx="0.6" fill={fill} />
      <rect x="4" y="16.5" width="4.6" height="1.9" rx="0.6" fill={fill} />
    </>
  ),
  // Curved horn sweeping up off the wall.
  horn: ({ fill }) => (
    <path d="M4 21 C4 12.5 8 6 14.5 3.5 C11.5 8 10.5 14.5 11.5 21 Z" fill={fill} />
  ),
};

export interface HoldGlyphProps {
  /** HoldType.id */
  id: string;
  /** HoldType.category, picks the accent color when `color` is not given. */
  category: string;
  /** Explicit fill override (e.g. a wall route color). */
  color?: string;
  className?: string;
  /** Draw the wall bar the hold is bolted to. */
  showWall?: boolean;
}

export default function HoldGlyph({
  id,
  category,
  color,
  className,
  showWall = true,
}: HoldGlyphProps) {
  const fill = color ?? categoryColorOf(category);
  const Shape = SHAPES[id];
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {showWall && <rect x="1.6" y="2" width="2.4" height="20" rx="0.8" fill="currentColor" opacity="0.28" />}
      {Shape ? <Shape fill={fill} /> : <circle cx="12" cy="12" r="7" fill={fill} />}
    </svg>
  );
}
