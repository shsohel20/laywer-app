// The Lawey icon set.
//
// Every glyph is transcribed from design/Law App Mobile Redesign. They are a
// matched 24px stroked set, so they are drawn with react-native-svg rather than
// mapped onto SF Symbols / Material — those would not line up with each other
// or with the design's optical weight.
//
// Shapes are declared as data so a glyph is one line to read and to diff
// against the design file.

import { memo } from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

import { colors } from "@/theme";

type Shape =
  | { p: string }
  | { c: [cx: number, cy: number, r: number] }
  | { r: [x: number, y: number, w: number, h: number, rx: number] };

interface Glyph {
  s: Shape[];
  /** Stroke width at 24px. Defaults to 2. */
  sw?: number;
  /** Solid glyph (star) rather than stroked. */
  solid?: true;
}

const GLYPHS = {
  // — Chrome ————————————————————————————————————————————————
  "arrow-left": { s: [{ p: "M19 12H6M11 6l-6 6 6 6" }], sw: 2.2 },
  "arrow-right": { s: [{ p: "M5 12h13M13 6l6 6-6 6" }], sw: 2.4 },
  "chevron-right": { s: [{ p: "m9 6 6 6-6 6" }] },
  "chevron-down": { s: [{ p: "m6 9 6 6 6-6" }] },
  close: { s: [{ p: "M6 6l12 12M18 6 6 18" }], sw: 2.2 },
  check: { s: [{ p: "m5 12.5 4.5 4.5L19 7.5" }], sw: 2.6 },
  "check-double": { s: [{ p: "m2 12.5 4 4 8-9" }, { p: "m10 16.5 8-9" }], sw: 2.4 },

  // — Actions ———————————————————————————————————————————————
  search: { s: [{ c: [11, 11, 7] }, { p: "M20 20l-4-4" }] },
  sliders: { s: [{ p: "M4 7h16M4 12h10M4 17h6" }] },
  /** Doubles as the location marker throughout the design. */
  send: { s: [{ p: "M21 3 3 10.5l8 2.5 2.5 8z" }], sw: 2.1 },
  bell: {
    s: [
      { p: "M18 15V10a6 6 0 1 0-12 0v5l-1.6 2.5h15.2z" },
      { p: "M9.6 20.5a2.6 2.6 0 0 0 4.8 0" },
    ],
    sw: 1.9,
  },
  share: {
    s: [
      { c: [18, 5, 3] },
      { c: [6, 12, 3] },
      { c: [18, 19, 3] },
      { p: "m8.6 10.6 6.8-4M8.6 13.4l6.8 4" },
    ],
  },
  paperclip: {
    s: [
      {
        p: "M21 12.5 12.7 20.8a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.3-2.3l7.8-7.8",
      },
    ],
  },
  download: { s: [{ p: "M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19h14" }] },
  upload: { s: [{ p: "M12 20V9M7.5 13.5 12 9l4.5 4.5M5 4h14" }] },
  edit: {
    s: [
      { p: "M11 4h-5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" },
      { p: "M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" },
    ],
  },
  eye: { s: [{ p: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" }, { c: [12, 12, 2.8] }] },
  gear: {
    s: [
      { c: [12, 12, 3.1] },
      {
        p: "M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
      },
    ],
    sw: 1.9,
  },
  image: {
    s: [
      { r: [3, 4.5, 18, 15, 2.5] },
      { c: [8.5, 10, 1.6] },
      { p: "m4 17 5-4.5 4 3.5 3-2.5 4 3.5" },
    ],
    sw: 1.9,
  },

  // — Objects ———————————————————————————————————————————————
  star: {
    s: [{ p: "M12 2l3 6.5 7 .9-5 4.8 1.2 7L12 17.8 5.8 21.2 7 14.2 2 9.4l7-.9z" }],
    solid: true,
  },
  heart: {
    s: [
      { p: "M12 21s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10z" },
    ],
  },
  bookmark: { s: [{ p: "M5 4h14v16l-7-3.5L5 20z" }], sw: 1.9 },
  chat: { s: [{ p: "M21 12a8 8 0 0 1-11.7 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" }] },
  doc: {
    s: [
      { p: "M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" },
      { p: "M14 3v5h5" },
    ],
    sw: 1.9,
  },
  phone: {
    s: [
      {
        p: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
      },
    ],
  },
  mail: { s: [{ r: [2, 4, 20, 16, 3] }, { p: "m3 6 9 6 9-6" }] },
  "map-pin": {
    s: [{ p: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" }, { c: [12, 10, 2.6] }],
  },
  calendar: { s: [{ r: [3, 5, 18, 16, 3] }, { p: "M8 3v4M16 3v4M3 11h18" }] },
  clock: { s: [{ c: [12, 12, 9] }, { p: "M12 7.5V12l3 2" }] },
  /** The zero-length dot in the design is drawn here as a 0.2pt round-capped
   *  stub, which renders identically and survives Android path flattening. */
  alert: { s: [{ c: [12, 12, 9] }, { p: "M12 8v4.5M12 15.9v.2" }] },
  card: { s: [{ r: [2.5, 5, 19, 14, 2.5] }, { p: "M2.5 10h19" }], sw: 1.9 },
  lock: { s: [{ r: [4, 10, 16, 11, 2.5] }, { p: "M8 10V7a4 4 0 0 1 8 0v3" }], sw: 1.9 },
  ban: { s: [{ c: [12, 12, 9] }, { p: "M5.6 5.6 18.4 18.4" }], sw: 1.9 },
  help: {
    s: [
      { c: [12, 12, 9] },
      { p: "M9.4 9.2a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2.4-2.6 4M12 17.9v.2" },
    ],
    sw: 1.9,
  },

  // — Practice areas ————————————————————————————————————————
  "area-family": {
    s: [
      { c: [8, 7.5, 2.8] },
      { c: [16.5, 8.5, 2.2] },
      { p: "M3 19.5a5 5 0 0 1 10 0M15 14.6a4.4 4.4 0 0 1 6 4.9" },
    ],
    sw: 1.8,
  },
  "area-business": {
    s: [
      { r: [2.5, 7, 19, 13, 2.5] },
      { p: "M9 7V5.2A1.7 1.7 0 0 1 10.7 3.5h2.6A1.7 1.7 0 0 1 15 5.2V7M2.5 12.5h19" },
    ],
    sw: 1.8,
  },
  "area-criminal": {
    s: [
      { p: "M12 2.8 20 5.6v5.9c0 4.9-3.4 8.3-8 9.7-4.6-1.4-8-4.8-8-9.7V5.6z" },
      { p: "m8.8 12 2.1 2.1 4.3-4.3" },
    ],
    sw: 1.8,
  },
  "area-property": {
    s: [
      { p: "M3.5 10.2 12 3.6l8.5 6.6V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" },
      { p: "M9.6 21v-6.2h4.8V21" },
    ],
    sw: 1.8,
  },
  "area-labour": {
    s: [{ p: "M12 3.5v17M5 7.2h14M7.2 7.2 4.2 14h6zM16.8 7.2 13.8 14h6zM8.5 20.5h7" }],
    sw: 1.8,
  },

  // — Tab bar ———————————————————————————————————————————————
  "nav-lawyers": {
    s: [
      { c: [9, 8, 3.4] },
      { p: "M2.6 20a6.4 6.4 0 0 1 12.8 0" },
      { c: [17.5, 9, 2.6] },
      { p: "M16 14.4a5.6 5.6 0 0 1 5.4 5.6" },
    ],
    sw: 1.9,
  },
  "nav-posts": {
    s: [{ p: "M4 20h4.5L20 8.5a2.5 2.5 0 0 0-3.5-3.5L5 16.5z" }, { p: "M14.5 6.5 18 10" }],
    sw: 1.9,
  },
  "nav-home": {
    s: [{ p: "M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1h-4v-6h-7v6h-4a1 1 0 0 1-1-1z" }],
    sw: 1.9,
  },
  "nav-account": {
    s: [{ c: [12, 7.5, 3.8] }, { p: "M4.8 20.5a7.2 7.2 0 0 1 14.4 0" }],
    sw: 1.9,
  },
  "nav-practice": {
    s: [
      { r: [3, 3.5, 7.5, 7.5, 1.8] },
      { r: [13.5, 3.5, 7.5, 7.5, 1.8] },
      { r: [3, 13.5, 7.5, 7, 1.8] },
      { r: [13.5, 13.5, 7.5, 7, 1.8] },
    ],
    sw: 1.9,
  },
} satisfies Record<string, Glyph>;

export type IconName = keyof typeof GLYPHS;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  /** Fill for `heart` and `star`. Pass "none" to leave a heart hollow. */
  fill?: string;
  /** Overrides the glyph's own stroke width. */
  strokeWidth?: number;
  /** The `sliders` glyph carries a coloured dot; this sets it. */
  accent?: string;
}

function IconBase({ name, size = 20, color = colors.ink, fill, strokeWidth, accent }: IconProps) {
  const glyph: Glyph = GLYPHS[name];
  const stroke = glyph.solid ? undefined : color;
  const shapeFill = glyph.solid ? (fill ?? color) : (fill ?? "none");
  const width = glyph.solid ? undefined : (strokeWidth ?? glyph.sw ?? 2);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {glyph.s.map((shape, i) => {
        const common = {
          fill: shapeFill,
          stroke,
          strokeWidth: width,
          strokeLinecap: "round" as const,
          strokeLinejoin: "round" as const,
        };
        if ("p" in shape) return <Path key={i} d={shape.p} {...common} />;
        if ("c" in shape) {
          return <Circle key={i} cx={shape.c[0]} cy={shape.c[1]} r={shape.c[2]} {...common} />;
        }
        return (
          <Rect
            key={i}
            x={shape.r[0]}
            y={shape.r[1]}
            width={shape.r[2]}
            height={shape.r[3]}
            rx={shape.r[4]}
            {...common}
          />
        );
      })}
      {name === "sliders" && accent ? <Circle cx={17} cy={12} r={2.2} fill={accent} /> : null}
    </Svg>
  );
}

export const Icon = memo(IconBase);
