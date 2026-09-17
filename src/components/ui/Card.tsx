// Container shapes: the bordered card, the grouped list with hairline rules,
// the ink hero panel, star ratings and the empty state.

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { cardShadow, colors, radius, spacing, type } from "@/theme";

import { Icon, type IconName } from "./Icon";

export interface CardProps {
  children: React.ReactNode;
  /** Lifts the card off the page, as on the lawyers and posts lists. */
  raised?: boolean;
  /** Highlights a card that needs attention (a new request). */
  emphasised?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, raised = false, emphasised = false, style }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        raised ? cardShadow : null,
        { borderColor: emphasised ? colors.ink : colors.cream },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/**
 * A rounded container whose children are separated by hairlines — settings,
 * schedules, credentials, verification documents.
 */
export function GroupedList({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.grouped, style]}>{children}</View>;
}

/** The hairline between rows in a GroupedList. Omit after the final row. */
export function Rule({ inset = 0 }: { inset?: number }) {
  return <View style={[styles.rule, { marginLeft: inset }]} />;
}

/** The near-black panel used for the account, help and earnings heroes. */
export function InkPanel({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.ink, style]}>{children}</View>;
}

export interface StarsProps {
  /** 1–5. Halves are rounded down, as the design has no half-star glyph. */
  rating: number;
  size?: number;
}

export function Stars({ rating, size = 13 }: StarsProps) {
  const filled = Math.round(rating);
  return (
    <View style={styles.stars} accessibilityLabel={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          name="star"
          size={size}
          color={n <= filled ? colors.yellow : colors.starEmpty}
        />
      ))}
    </View>
  );
}

export interface EmptyStateProps {
  icon: IconName;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function EmptyState({ icon, message, actionLabel, onActionPress }: EmptyStateProps) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Icon name={icon} size={26} color={colors.amber} strokeWidth={1.8} />
      </View>
      <Text style={styles.emptyText}>{message}</Text>
      {actionLabel ? (
        <Pressable
          onPress={onActionPress}
          accessibilityRole="button"
          style={({ pressed }) => [styles.emptyAction, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.emptyActionLabel}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    padding: spacing.lg - 1,
  },
  grouped: {
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  rule: {
    height: 1,
    backgroundColor: colors.cream,
  },
  ink: {
    borderRadius: radius.xxl,
    backgroundColor: colors.ink,
    padding: 18,
  },
  stars: {
    flexDirection: "row",
    gap: 1.5,
  },
  empty: {
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 44,
    paddingHorizontal: spacing.xxl,
  },
  emptyIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    height: 54,
    borderRadius: radius.lg,
    backgroundColor: colors.tint,
  },
  emptyText: {
    ...type.lede,
    textAlign: "center",
    color: colors.textMuted,
  },
  emptyAction: {
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  emptyActionLabel: {
    ...type.buttonSmall,
  },
});
