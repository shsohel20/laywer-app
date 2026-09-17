// How much of a capped plan is left.
//
// Shown on the Practice dashboard as a banner and on the Subscription screen as
// a section, so the number a lawyer sees in both places comes from one place.

import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui";
import { PERIOD_RESETS, RENEWAL_DATE, periodFor, priceFor } from "@/data";
import { useSubscription } from "@/state/app-state";
import { colors, radius, spacing, type } from "@/theme";

interface MeterProps {
  label: string;
  used: number;
  limit: number;
}

function Meter({ label, used, limit }: MeterProps) {
  const spent = Math.min(used, limit);
  const full = spent >= limit;

  return (
    <View style={styles.meter}>
      <View style={styles.meterHead}>
        <Text style={styles.meterLabel}>{label}</Text>
        <Text style={[styles.meterCount, full && styles.meterCountFull]}>
          {spent} of {limit}
        </Text>
      </View>
      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: limit, now: spent }}
      >
        {Array.from({ length: limit }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.segment,
              { backgroundColor: index < spent ? colors.yellow : colors.border },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

/** The two meters, for use inside the Subscription screen. */
export function PlanUsage() {
  const { plan, requestsUsed, postsUsed } = useSubscription();

  if (plan.requestLimit === null && plan.postLimit === null) {
    return (
      <View style={styles.unlimited}>
        <Icon name="check" size={16} color={colors.amber} strokeWidth={2.4} />
        <Text style={styles.unlimitedText}>
          No caps on {plan.name}. Requests and posts are unlimited.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.meters}>
      {plan.requestLimit !== null ? (
        <Meter label="Requests accepted" used={requestsUsed} limit={plan.requestLimit} />
      ) : null}
      {plan.postLimit !== null ? (
        <Meter label="Posts published" used={postsUsed} limit={plan.postLimit} />
      ) : null}
      <Text style={styles.resets}>Resets {PERIOD_RESETS}</Text>
    </View>
  );
}

/**
 * The Account entry point. Unlike PlanBanner this always renders, on every
 * tier — changing or cancelling a plan has to be reachable whether or not you
 * are near a cap.
 */
export function PlanCard() {
  const { plan, billingCycle, requestsUsed, requestsRemaining } = useSubscription();
  const paid = plan.monthlyPrice > 0;
  const capped = plan.requestLimit !== null;
  const exhausted = requestsRemaining === 0;

  const detail = paid
    ? `${priceFor(plan, billingCycle)}${periodFor(plan, billingCycle)} · renews ${RENEWAL_DATE}`
    : capped
      ? `${requestsUsed} of ${plan.requestLimit} requests used · resets ${PERIOD_RESETS}`
      : "No card on file";

  return (
    <Pressable
      onPress={() => router.push("/law/subscription")}
      accessibilityRole="button"
      accessibilityLabel={`Current plan: ${plan.name}. ${detail}`}
      accessibilityHint="Opens subscription and billing"
      style={({ pressed }) => [
        styles.planCard,
        exhausted && styles.planCardExhausted,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.planIcon, paid && styles.planIconPaid]}>
        <Icon
          name="star"
          size={18}
          color={paid ? colors.ink : colors.amber}
          fill={paid ? colors.ink : "none"}
        />
      </View>
      <View style={styles.planBody}>
        <View style={styles.planTitleRow}>
          <Text style={styles.planName}>{plan.name} plan</Text>
          {!paid ? <Text style={styles.planUpgrade}>Upgrade</Text> : null}
        </View>
        <Text style={styles.planDetail}>{detail}</Text>
      </View>
      <Icon name="chevron-right" size={17} color={colors.textDisabled} />
    </Pressable>
  );
}

/**
 * The dashboard banner. Renders nothing on an uncapped plan — a lawyer who is
 * already paying should not be sold to on every visit.
 */
export function PlanBanner() {
  const { plan, requestsUsed, requestsRemaining } = useSubscription();

  if (plan.requestLimit === null) return null;

  const exhausted = requestsRemaining === 0;

  return (
    <Pressable
      onPress={() => router.push("/law/subscription")}
      accessibilityRole="button"
      accessibilityLabel={`${plan.name} plan. ${requestsUsed} of ${plan.requestLimit} requests used. Opens subscription.`}
      style={({ pressed }) => [
        styles.banner,
        exhausted && styles.bannerExhausted,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.bannerHead}>
        <Text style={styles.bannerPlan}>{plan.name} plan</Text>
        <Text style={styles.bannerAction}>Upgrade</Text>
        <Icon name="chevron-right" size={15} color={colors.amber} />
      </View>
      <Meter label="Requests accepted" used={requestsUsed} limit={plan.requestLimit} />
      <Text style={styles.bannerHint}>
        {exhausted
          ? `Cap reached. New requests still arrive — upgrade to accept them. Resets ${PERIOD_RESETS}.`
          : `Resets ${PERIOD_RESETS}. Upgrade for unlimited requests and posts.`}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  meters: {
    gap: spacing.lg,
  },
  meter: {
    gap: spacing.sm,
  },
  meterHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  meterLabel: {
    ...type.bodySemi,
    fontSize: 13.5,
  },
  meterCount: {
    ...type.captionMedium,
    fontSize: 12.5,
  },
  meterCountFull: {
    color: colors.amber,
  },
  track: {
    flexDirection: "row",
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  resets: {
    ...type.caption,
    fontSize: 12.5,
  },
  unlimited: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
    padding: spacing.lg - 2,
    borderRadius: radius.sm,
    backgroundColor: colors.tint,
  },
  unlimitedText: {
    ...type.caption,
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textBody,
  },
  planCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
  planCardExhausted: {
    borderColor: colors.ink,
    backgroundColor: colors.tint,
  },
  planIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    flexShrink: 0,
    borderRadius: radius.sm,
    backgroundColor: colors.tint,
  },
  planIconPaid: {
    backgroundColor: colors.yellow,
  },
  planBody: {
    flex: 1,
    minWidth: 0,
  },
  planTitleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.sm,
  },
  planName: {
    ...type.bodySemi,
    flex: 1,
    minWidth: 0,
    fontSize: 15,
  },
  planUpgrade: {
    ...type.link,
    flexShrink: 0,
  },
  planDetail: {
    ...type.caption,
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 2,
  },
  banner: {
    gap: spacing.md,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
  bannerExhausted: {
    borderColor: colors.ink,
    backgroundColor: colors.tint,
  },
  bannerHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  bannerPlan: {
    ...type.bodySemi,
    flex: 1,
    minWidth: 0,
    fontSize: 14,
  },
  bannerAction: {
    ...type.link,
  },
  bannerHint: {
    ...type.caption,
    fontSize: 12.5,
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.85,
  },
});
