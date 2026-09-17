// Spacing, radii and fixed sizes for the Lawey app.
// Read off design/Law App Mobile Redesign — the design is built on a 20px
// gutter with a 4px sub-grid, and radii that grow with the size of the surface.

export const spacing = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 26,
} as const;

export const radius = {
  /** Inputs, small tiles, avatars inside rows. */
  sm: 12,
  /** Search fields, primary buttons, modal footers. */
  md: 14,
  /** Cards, grouped lists, section containers. */
  lg: 16,
  /** Lawyer and post cards. */
  xl: 18,
  /** Account hero, earnings hero, sheet corners. */
  xxl: 20,
  /** Bottom sheets. */
  sheet: 24,
  /** Fully round. */
  full: 999,
} as const;

export const layout = {
  /** Page gutter. Every screen in the design uses 20px. */
  gutter: 20,
  /** Height of the ink tab bar, before the home-indicator inset. */
  tabBarHeight: 68,
  /** Minimum touch target. Every interactive element is at least this tall. */
  touchTarget: 44,
  /** Search field / filter button. */
  fieldHeight: 48,
  /** Form inputs and the tall primary buttons on forms. */
  inputHeight: 52,
  /** Filter and category chips. */
  chipHeight: 38,
  /** Rows in a grouped list. */
  rowHeight: 58,
  /** Portrait card in the Nearby / Popular rails. */
  portraitCard: { width: 140, height: 176 },
} as const;

/** The soft lift under lawyer and post cards. */
export const cardShadow = {
  shadowColor: "#010207",
  shadowOpacity: 0.04,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 2 },
  elevation: 1,
} as const;
