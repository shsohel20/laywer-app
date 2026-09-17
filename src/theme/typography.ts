// Type scale for the Lawey app.
//
// React Native cannot synthesise weights for a custom family: on Android
// `fontWeight` is ignored once `fontFamily` is set. So every weight is its own
// family and the presets below never set `fontWeight` — pick the family.
//
// The design specifies letter-spacing in em; RN wants points, so the tight
// headline tracking (-0.025em) is multiplied out per size.

import type { TextStyle } from "react-native";

import { colors } from "./colors";

export const fonts = {
  regular: "BeVietnamPro_400Regular",
  medium: "BeVietnamPro_500Medium",
  semibold: "BeVietnamPro_600SemiBold",
  bold: "BeVietnamPro_700Bold",
} as const;

/** -0.025em, the tracking on every bold headline in the design. */
const tight = (size: number) => Math.round(size * -0.025 * 100) / 100;

export const type = {
  /** Onboarding and auth headlines. */
  display: {
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 33,
    letterSpacing: tight(30),
    color: colors.text,
  },
  /** Lawyer name on a profile, post headline. */
  h1: {
    fontFamily: fonts.bold,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: tight(26),
    color: colors.text,
  },
  /** Titles of primary tab screens: Law Posts, Messages, Account. */
  screenTitle: {
    fontFamily: fonts.bold,
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: tight(25),
    color: colors.text,
  },
  /** Titles of pushed sub-screens: Saved lawyers, Password, Earnings. */
  pageTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: tight(20),
    color: colors.text,
  },
  /** Post card headline, brand wordmark. */
  h3: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: tight(18),
    color: colors.text,
  },
  /** Big numerals: stat tiles, dashboard counters. */
  stat: {
    fontFamily: fonts.bold,
    fontSize: 21.5,
    lineHeight: 22,
    letterSpacing: tight(21.5),
    color: colors.text,
  },
  /** The uppercase rules above every section. */
  sectionLabel: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.65,
    textTransform: "uppercase",
    color: colors.textMuted,
  },
  /** Row titles, input text, most 15px copy. */
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
  bodyMedium: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
  bodySemi: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.text,
  },
  /** Explanatory paragraph under a page title. */
  lede: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textBody,
  },
  /** Long-form post body. */
  prose: {
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 29,
    color: colors.prose,
  },
  /** Form field labels. */
  fieldLabel: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 16,
    color: colors.textStrong,
  },
  /** Secondary meta: dates, locations, hints. */
  caption: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
  },
  captionMedium: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textMuted,
  },
  /** Tab bar labels, stat captions. */
  micro: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 15,
    color: colors.textMuted,
  },
  /** Status pills and unread counts. */
  pill: {
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.33,
    color: colors.ink,
  },
  /** Primary and secondary button labels. */
  button: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink,
  },
  buttonSmall: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.ink,
  },
  /** The amber "See all" / "Availability" text links. */
  link: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.amber,
  },
} satisfies Record<string, TextStyle>;

export type TypeKey = keyof typeof type;
