// Selectable chips and the horizontal rails they sit in.
//
// The design uses two selected tones: solid ink for mutually-exclusive filters
// and tabs, and a soft tint for multi-select tags. `tone` picks between them.

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { layout, radius, selectable, spacing, type } from "@/theme";

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  /** "solid" fills with ink; "soft" fills with the pale tint. */
  tone?: "solid" | "soft";
  /** Chips in a row of equal widths (sort, urgency, reply target). */
  grow?: boolean;
  size?: "sm" | "md";
}

export function Chip({
  label,
  selected = false,
  onPress,
  tone = "solid",
  grow = false,
  size = "sm",
}: ChipProps) {
  const fill = selected ? (tone === "soft" ? selectable.onSoft : selectable.on) : selectable.off;
  const height = size === "md" ? 46 : layout.chipHeight;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.chip,
        {
          minHeight: height,
          borderRadius: size === "md" ? radius.sm : height / 2,
          borderColor: fill.border,
          backgroundColor: fill.bg,
          opacity: pressed ? 0.75 : 1,
        },
        grow ? styles.grow : styles.hug,
      ]}
    >
      <Text style={[styles.label, { color: fill.fg }]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

export interface ChipRailProps {
  children: React.ReactNode;
  /** Bottom padding under the rail. */
  gap?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontally scrolling row of chips that bleeds to both screen edges
 * instead of clipping at the gutter.
 */
export function ChipRail({ children, style }: ChipRailProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.rail, style]}
      contentContainerStyle={styles.railContent}
    >
      {children}
    </ScrollView>
  );
}

/** Chips that wrap onto multiple lines (practice areas, filter categories). */
export function ChipWrap({ children }: { children: React.ReactNode }) {
  return <View style={styles.wrap}>{children}</View>;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  hug: {
    flexGrow: 0,
    flexShrink: 0,
  },
  grow: {
    flex: 1,
  },
  label: {
    ...type.body,
    fontSize: 13,
    fontFamily: type.bodySemi.fontFamily,
  },
  rail: {
    marginHorizontal: -layout.gutter,
    flexGrow: 0,
  },
  railContent: {
    paddingHorizontal: layout.gutter,
    gap: spacing.sm,
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
