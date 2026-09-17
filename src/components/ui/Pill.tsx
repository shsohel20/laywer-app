// Small status and count pills.
//
// The design carries every status on one of three tones — there is no red or
// green in the palette, so "declined" reads as recessive grey rather than an
// alarm colour, and the strongest tone is reserved for what needs attention.

import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius, spacing, type } from "@/theme";

export type PillTone = "strong" | "soft" | "muted";

export interface PillProps {
  label: string;
  tone?: PillTone;
  style?: StyleProp<ViewStyle>;
}

const TONES: Record<PillTone, { bg: string; fg: string }> = {
  /** Yellow — new requests, accepted, verified. Demands a response. */
  strong: { bg: colors.yellow, fg: colors.ink },
  /** Tint — pending, checking. In flight. */
  soft: { bg: colors.tint, fg: colors.amber },
  /** Grey — declined, not needed. Settled and out of the way. */
  muted: { bg: colors.surface, fg: colors.textMuted },
};

export function Pill({ label, tone = "soft", style }: PillProps) {
  const fill = TONES[tone];
  return (
    <View style={[styles.pill, { backgroundColor: fill.bg }, style]}>
      <Text style={[type.pill, { color: fill.fg }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/** The lowercase category pill on posts. */
export function CategoryPill({ label, style }: { label: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.pill, styles.category, style]}>
      <Text style={styles.categoryLabel}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 24,
    paddingHorizontal: 9,
    borderRadius: radius.md - 2,
  },
  category: {
    minHeight: 26,
    paddingHorizontal: spacing.sm + 2,
    backgroundColor: colors.tint,
  },
  categoryLabel: {
    ...type.pill,
    fontSize: 11,
    letterSpacing: 0.22,
    color: colors.ink,
  },
});
