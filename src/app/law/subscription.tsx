// The lawyer's plan: what they are on, what it costs, and what else is offered.

import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { PlanUsage } from "@/components/law/PlanUsage";
import {
  BackHeader,
  Button,
  Chip,
  GroupedList,
  Icon,
  InkPanel,
  Pill,
  Rule,
  Screen,
  ScreenScroll,
} from "@/components/ui";
import {
  CHARGES,
  PAYMENT_METHOD,
  PLANS,
  RENEWAL_DATE,
  periodFor,
  priceFor,
} from "@/data";
import { MONTHS_BILLED_YEARLY } from "@/data/plans";
import { useSubscription } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";
import type { BillingCycle, ChargeStatus, Plan } from "@/types";

const CHARGE_TONES: Record<ChargeStatus, "strong" | "soft" | "muted"> = {
  PAID: "muted",
  DUE: "soft",
  FAILED: "strong",
};

export default function SubscriptionScreen() {
  const { plan, billingCycle, setPlan, setBillingCycle } = useSubscription();
  const paid = plan.monthlyPrice > 0;

  return (
    <Screen>
      <BackHeader title="Subscription" size="sm" />
      <ScreenScroll>
        <View style={styles.block}>
          <InkPanel>
            <View style={styles.heroHead}>
              <Text style={styles.heroLabel}>Current plan</Text>
              {paid ? <Pill label="ACTIVE" tone="strong" /> : null}
            </View>
            <Text style={styles.heroPlan}>{plan.name}</Text>
            <Text style={styles.heroMeta}>
              {paid
                ? `${priceFor(plan, billingCycle)}${periodFor(plan, billingCycle)} · renews ${RENEWAL_DATE}`
                : "No card on file. Upgrade whenever you are ready."}
            </Text>
            <View style={styles.heroNote}>
              <Icon name="check" size={14} color={colors.yellow} strokeWidth={2.4} />
              <Text style={styles.heroNoteText}>
                We take no commission. You keep 100% of every fee a client pays.
              </Text>
            </View>
          </InkPanel>
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>This month</Text>
          <PlanUsage />
        </View>

        <View style={styles.block}>
          <View style={styles.plansHead}>
            <Text style={styles.sectionTitle}>Plans</Text>
            <View style={styles.cycle}>
              {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
                <Chip
                  key={cycle}
                  label={cycle === "yearly" ? "Yearly" : "Monthly"}
                  selected={billingCycle === cycle}
                  onPress={() => setBillingCycle(cycle)}
                />
              ))}
            </View>
          </View>

          <Text style={styles.cycleHint}>
            {billingCycle === "yearly"
              ? `Billed for ${MONTHS_BILLED_YEARLY} months — two months free.`
              : "Billed monthly. Cancel any time."}
          </Text>

          <View style={styles.plans}>
            {PLANS.map((option) => (
              <PlanCard
                key={option.id}
                plan={option}
                cycle={billingCycle}
                current={option.id === plan.id}
                onSelect={() => setPlan(option.id, billingCycle)}
              />
            ))}
          </View>
        </View>

        {paid ? (
          <>
            <View style={styles.block}>
              <Text style={styles.sectionTitle}>Payment method</Text>
              <View style={styles.card}>
                <Icon name="card" size={18} color={colors.ink} strokeWidth={1.9} />
                <View style={styles.cardBody}>
                  <Text style={styles.cardName}>{PAYMENT_METHOD.label}</Text>
                  <Text style={styles.cardHint}>{PAYMENT_METHOD.hint}</Text>
                </View>
                <Text style={styles.cardAction}>Change</Text>
              </View>
            </View>

            <View style={styles.block}>
              <Text style={styles.sectionTitle}>Billing history</Text>
              <GroupedList>
                {CHARGES.map((charge, index) => (
                  <View key={charge.id}>
                    <View style={styles.charge}>
                      <View style={styles.chargeBody}>
                        <Text style={styles.chargeLabel} numberOfLines={1}>
                          {charge.label}
                        </Text>
                        <Text style={styles.chargeDate}>{charge.date}</Text>
                      </View>
                      <Text style={styles.chargeAmount}>{charge.amount}</Text>
                      <Pill label={charge.status} tone={CHARGE_TONES[charge.status]} />
                    </View>
                    {index < CHARGES.length - 1 ? <Rule /> : null}
                  </View>
                ))}
              </GroupedList>
            </View>

            <View style={styles.block}>
              <Button
                label="Cancel subscription"
                variant="quiet"
                onPress={() => setPlan("free")}
              />
              <Text style={styles.footnote}>
                Cancelling drops you to Free at the end of the period. Matters already open are
                never affected.
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.block}>
            <Button
              label="See how payouts work"
              variant="outline"
              onPress={() => router.push("/law/earnings")}
            />
          </View>
        )}
      </ScreenScroll>
    </Screen>
  );
}

function PlanCard({
  plan,
  cycle,
  current,
  onSelect,
}: {
  plan: Plan;
  cycle: BillingCycle;
  current: boolean;
  onSelect: () => void;
}) {
  return (
    <View style={[styles.plan, (current || plan.recommended) && styles.planEmphasised]}>
      <View style={styles.planHead}>
        <Text style={styles.planName}>{plan.name}</Text>
        {current ? (
          <Pill label="CURRENT" tone="strong" />
        ) : plan.recommended ? (
          <Pill label="POPULAR" tone="soft" />
        ) : null}
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{priceFor(plan, cycle)}</Text>
        <Text style={styles.period}>{periodFor(plan, cycle)}</Text>
      </View>

      <Text style={styles.tagline}>{plan.tagline}</Text>

      <View style={styles.features}>
        {plan.features.map((feature) => (
          <View key={feature} style={styles.feature}>
            <Icon name="check" size={13} color={colors.amber} strokeWidth={2.6} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {current ? (
        <View style={styles.currentNote}>
          <Text style={styles.currentNoteText}>You are on this plan</Text>
        </View>
      ) : (
        <Button
          label={plan.monthlyPrice === 0 ? "Switch to Free" : `Choose ${plan.name}`}
          variant={plan.recommended ? "primary" : "outline"}
          size="sm"
          onPress={onSelect}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    ...type.sectionLabel,
    marginBottom: 11,
  },
  heroHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  heroLabel: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11.5,
    letterSpacing: 0.69,
    color: colors.onDarkMuted,
  },
  heroPlan: {
    ...type.display,
    fontSize: 30,
    lineHeight: 34,
    color: colors.white,
    marginTop: spacing.md,
  },
  heroMeta: {
    ...type.caption,
    fontSize: 13,
    lineHeight: 19,
    color: colors.onDarkMuted,
    marginTop: spacing.xxs,
  },
  heroNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.onDarkTrack,
  },
  heroNoteText: {
    ...type.caption,
    flex: 1,
    minWidth: 0,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.onDarkMuted,
  },
  plansHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  cycle: {
    flexDirection: "row",
    gap: spacing.xs,
    marginBottom: 11,
  },
  cycleHint: {
    ...type.caption,
    fontSize: 12.5,
    marginBottom: spacing.lg,
  },
  plans: {
    gap: spacing.md,
  },
  plan: {
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
  },
  planEmphasised: {
    borderColor: colors.ink,
  },
  planHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  planName: {
    ...type.h3,
    fontSize: 17,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 3,
  },
  price: {
    ...type.display,
    fontSize: 30,
    lineHeight: 32,
  },
  period: {
    ...type.captionMedium,
    fontSize: 13,
  },
  tagline: {
    ...type.caption,
    fontSize: 13,
    lineHeight: 19,
  },
  features: {
    gap: spacing.sm + 2,
  },
  feature: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm + 2,
  },
  featureText: {
    ...type.body,
    flex: 1,
    minWidth: 0,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.textStrong,
  },
  currentNote: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  currentNoteText: {
    ...type.buttonSmall,
    color: colors.textMuted,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
  },
  cardName: {
    ...type.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  cardHint: {
    ...type.caption,
    marginTop: 2,
  },
  cardAction: {
    ...type.link,
    flexShrink: 0,
  },
  charge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 64,
    paddingVertical: spacing.md,
    paddingHorizontal: 15,
  },
  chargeBody: {
    flex: 1,
    minWidth: 0,
  },
  chargeLabel: {
    ...type.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  chargeDate: {
    ...type.caption,
    marginTop: 2,
  },
  chargeAmount: {
    ...type.bodySemi,
    flexShrink: 0,
  },
  footnote: {
    ...type.caption,
    textAlign: "center",
    lineHeight: 18,
    marginTop: spacing.md,
  },
});
