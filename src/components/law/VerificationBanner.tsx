// The nudge to finish an identity check.
//
// Both sides of the marketplace are verified, so the wording lives here rather
// than on each screen that chases it. Renders nothing once the check clears —
// a verified account should not be nagged on every visit.

import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { Icon } from "@/components/ui";
import { VERIFY_COPY, VERIFY_ICONS } from "@/data";
import { useSession, useVerification } from "@/state/app-state";
import { colors, radius, spacing, type } from "@/theme";

export function VerificationBanner({ style }: { style?: StyleProp<ViewStyle> }) {
  const { role } = useSession();
  const { docs, status, providedCount } = useVerification();

  if (status === "verified") return null;

  const copy = VERIFY_COPY[role];
  const pending = status === "pending";
  const outstanding = docs.length - providedCount;

  const title = pending
    ? "Verification in review"
    : outstanding === 0
      ? "Ready to submit"
      : "Verify your identity";

  const hint = pending
    ? copy.blurb
    : outstanding === 0
      ? `All ${docs.length} documents added. Send them for review.`
      : `${outstanding} document${outstanding === 1 ? "" : "s"} outstanding. ${copy.unverified}`;

  return (
    <Pressable
      onPress={() => router.push("/verification")}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${hint}`}
      accessibilityHint="Opens identity verification"
      style={({ pressed }) => [styles.banner, pressed && styles.pressed, style]}
    >
      <View style={styles.icon}>
        <Icon name={VERIFY_ICONS[status]} size={18} color={colors.ink} strokeWidth={2.2} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      <Icon name="chevron-right" size={17} color={colors.ink} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingVertical: spacing.lg - 2,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.ink,
    borderRadius: radius.lg,
    backgroundColor: colors.tint,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    flexShrink: 0,
    borderRadius: spacing.sm + 2,
    backgroundColor: colors.yellow,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    ...type.bodySemi,
    fontSize: 14,
  },
  hint: {
    ...type.caption,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.amber,
    marginTop: 3,
  },
  pressed: {
    opacity: 0.85,
  },
});
