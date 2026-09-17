// Balance, escrow and the payout history.

import { StyleSheet, Text, View } from "react-native";

import {
  BackHeader,
  Button,
  GroupedList,
  Icon,
  InkPanel,
  Rule,
  Screen,
  ScreenScroll,
} from "@/components/ui";
import { EARNINGS, TRANSACTIONS } from "@/data";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function EarningsScreen() {
  return (
    <Screen>
      <BackHeader title="Earnings" size="sm" />
      <ScreenScroll>
        <View style={styles.block}>
          <InkPanel>
            <Text style={styles.heroLabel}>Available to pay out</Text>
            <Text style={styles.heroValue}>{EARNINGS.available}</Text>
            <View style={styles.heroStats}>
              <HeroStat label="In escrow" value={EARNINGS.escrow} />
              <HeroStat label="This month" value={EARNINGS.thisMonth} accent />
            </View>
            <Button label="Pay out to bank" size="sm" style={styles.heroButton} />
          </InkPanel>
        </View>

        <View style={styles.block}>
          <View style={styles.bank}>
            <Icon name="card" size={18} color={colors.ink} />
            <View style={styles.bankBody}>
              <Text style={styles.bankName}>{EARNINGS.bank}</Text>
              <Text style={styles.bankHint}>{EARNINGS.bankHint}</Text>
            </View>
            <Text style={styles.bankAction}>Change</Text>
          </View>
        </View>

        <View style={styles.block}>
          <View style={styles.noCommission}>
            <Icon name="check" size={16} color={colors.amber} strokeWidth={2.4} />
            <Text style={styles.noCommissionText}>
              No commission is taken. Your subscription covers the platform, so every fee a
              client pays reaches you in full.
            </Text>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <GroupedList>
            {TRANSACTIONS.map((transaction, index) => {
              const incoming = transaction.amount.startsWith("+");
              return (
                <View key={transaction.id}>
                  <View style={styles.transaction}>
                    <View style={styles.transactionBody}>
                      <Text style={styles.transactionLabel} numberOfLines={1}>
                        {transaction.label}
                      </Text>
                      <Text style={styles.transactionMeta}>{transaction.meta}</Text>
                    </View>
                    <Text
                      style={[
                        styles.amount,
                        { color: incoming ? colors.text : colors.textMuted },
                      ]}
                    >
                      {transaction.amount}
                    </Text>
                  </View>
                  {index < TRANSACTIONS.length - 1 ? <Rule /> : null}
                </View>
              );
            })}
          </GroupedList>
        </View>
      </ScreenScroll>
    </Screen>
  );
}

function HeroStat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={styles.heroStat}>
      <Text style={styles.heroStatLabel}>{label}</Text>
      <Text style={[styles.heroStatValue, accent && { color: colors.yellow }]}>{value}</Text>
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
  heroLabel: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11.5,
    letterSpacing: 0.69,
    color: colors.onDarkMuted,
  },
  heroValue: {
    ...type.display,
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: -1.19,
    color: colors.white,
    marginTop: 15,
  },
  heroStats: {
    flexDirection: "row",
    gap: spacing.xl,
    marginTop: 15,
  },
  heroStat: {
    gap: 2,
  },
  heroStatLabel: {
    ...type.caption,
    color: colors.onDarkMuted,
  },
  heroStatValue: {
    ...type.bodySemi,
    color: colors.white,
  },
  heroButton: {
    minHeight: 48,
    marginTop: 17,
  },
  bank: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
  },
  bankBody: {
    flex: 1,
    minWidth: 0,
  },
  bankName: {
    ...type.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  bankHint: {
    ...type.caption,
    marginTop: 2,
  },
  bankAction: {
    ...type.link,
    flexShrink: 0,
  },
  noCommission: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm + 2,
    padding: spacing.lg - 2,
    borderRadius: radius.lg,
    backgroundColor: colors.tint,
  },
  noCommissionText: {
    ...type.caption,
    flex: 1,
    minWidth: 0,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textBody,
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    minHeight: 64,
    paddingVertical: spacing.md,
    paddingHorizontal: 15,
  },
  transactionBody: {
    flex: 1,
    minWidth: 0,
  },
  transactionLabel: {
    ...type.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  transactionMeta: {
    ...type.caption,
    marginTop: 2,
  },
  amount: {
    ...type.bodySemi,
    flexShrink: 0,
    letterSpacing: -0.15,
  },
});
