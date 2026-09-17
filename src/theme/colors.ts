// Palette for the Lawey app.
// Every value is taken verbatim from design/Law App Mobile Redesign.
// The design is a two-tone system: near-black ink for structure, a single
// saturated yellow for anything the user can act on, and a warm paper scale
// in between. There is no second accent hue by design — status is carried by
// the tint/yellow pair plus weight, never by a new colour.

export const colors = {
  /** Near-black. Text, the tab bar, filled "selected" states. */
  ink: "#010207",
  /** The one action colour: primary buttons, active nav, unread badges. */
  yellow: "#FFC524",
  /** Pressed state for anything yellow. */
  yellowPressed: "#E8B01A",
  /** Pale yellow wash behind icons, pills and selected chips. */
  tint: "#FFF4D6",
  /** Readable yellow — used for text and icons that must sit on white. */
  amber: "#7A5C00",

  /** Page backdrop outside the phone frame, and the heaviest hairline. */
  cream: "#F0EDE8",
  /** Inset surfaces: search fields, quoted blocks, inactive time chips. */
  surface: "#F6F4F0",
  /** Default 1px border on cards, inputs and outline buttons. */
  border: "#E5E2DC",
  white: "#FFFFFF",
  /** Row background for anything unread. */
  unread: "#FFFBF0",

  // Text ramp, darkest to lightest.
  text: "#010207",
  textStrong: "#2A2A2E",
  textBody: "#4A4A4E",
  textMuted: "#6E6E73",
  textFaint: "#8A8A8E",
  textDisabled: "#B8B6B2",
  placeholder: "#9A9894",

  /** Long-form post body — very slightly warm against pure ink. */
  prose: "#211715",
  /** Online presence dot. The only hue outside the two-tone system. */
  online: "#22C55E",
  offline: "#B8B6B2",

  /** Disabled fill for the send/submit buttons. */
  disabled: "#F0EDE8",
  /** Inactive star in the rating filter. */
  starEmpty: "#DEDCD8",

  /** Scrims and translucent overlays over photography. */
  scrim: "rgba(1,2,7,0.45)",
  scrimButton: "rgba(1,2,7,0.5)",
  onDarkButton: "rgba(255,255,255,0.14)",
  onDarkSurface: "rgba(255,255,255,0.1)",
  onDarkSurfacePressed: "rgba(255,255,255,0.16)",
  onDarkTrack: "rgba(255,255,255,0.18)",
  /** Muted text on the ink cards. */
  onDarkMuted: "#B8B6B2",
} as const;

export type ColorName = keyof typeof colors;

/** The chip/segmented-control pair used in a dozen places in the design. */
export const selectable = {
  /** Solid ink — filter chips, tabs, urgency picker. */
  on: { border: colors.ink, bg: colors.ink, fg: colors.white },
  /** Tinted — practice areas, post categories, request areas. */
  onSoft: { border: colors.ink, bg: colors.tint, fg: colors.ink },
  off: { border: colors.border, bg: colors.white, fg: colors.textBody },
} as const;

export type SelectableTone = { border: string; bg: string; fg: string };
