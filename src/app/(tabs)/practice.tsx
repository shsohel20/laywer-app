// The lawyer's dashboard: what is waiting, what is on today, and what is owed.

import { router, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PlanBanner } from "@/components/law/PlanUsage";
import { VerificationBanner } from "@/components/law/VerificationBanner";
import {
  Avatar,
  Button,
  GroupedList,
  IconButton,
  LogoMark,
  Pill,
  Rule,
  Screen,
  ScreenScroll,
  Section,
} from "@/components/ui";
import { INBOX_REQUESTS, ME_AS_LAWYER, SCHEDULE } from "@/data";
import { useBadges, useInbox } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";
import type { ScheduleKind } from "@/types";

interface Stat {
  label: string;
  value: string;
  hint: string;
  href: Href;
  emphasised: boolean;
}

export default function PracticeScreen() {
  const { inboxStatusFor, newRequestCount } = useInbox();
  const { hasUnreadAlerts } = useBadges();

  const waiting = INBOX_REQUESTS.filter(
    (request) => inboxStatusFor(request.id) === "new",
  ).slice(0, 3);

  const stats: Stat[] = [
    {
      label: "New requests",
      value: String(newRequestCount),
      hint: waiting.length > 0 ? `Oldest waiting ${waiting[0].age}` : "Nothing waiting",
      href: "/inbox",
      emphasised: true,
    },
    {
      label: "Active matters",
      value: "11",
      hint: "4 with unread messages",
      href: "/messages",
      emphasised: false,
    },
    {
      label: "Reply rate",
      value: "94%",
      hint: "Within your 2 hour target",
      href: "/law/availability",
      emphasised: false,
    },
    {
      label: "This month",
      value: "$6,430",
      hint: "$4,280 ready to pay out · no commission",
      href: "/law/earnings",
      emphasised: false,
    },
  ];

  return (
    <Screen>
      <ScreenScroll>
        <View style={styles.header}>
          <View style={styles.brand}>
            <LogoMark size={34} />
            <View style={styles.brandBody}>
              <Text style={styles.brandLabel}>Practice</Text>
              <Text style={styles.brandName} numberOfLines={1}>
                {ME_AS_LAWYER.name}
              </Text>
            </View>
          </View>
          <IconButton
            icon="bell"
            label="Notifications"
            onPress={() => router.push("/alerts")}
            badged={hasUnreadAlerts}
          />
        </View>

        <View style={styles.gutter}>
          <VerificationBanner />
        </View>

        <View style={[styles.gutter, styles.planBanner]}>
          <PlanBanner />
        </View>

        <View style={[styles.gutter, styles.stats]}>
          {stats.map((stat) => (
            <Pressable
              key={stat.label}
              onPress={() => router.push(stat.href)}
              accessibilityRole="button"
              accessibilityLabel={`${stat.label}: ${stat.value}. ${stat.hint}`}
              style={({ pressed }) => [
                styles.stat,
                stat.emphasised && styles.statEmphasised,
                pressed && { borderColor: colors.ink },
              ]}
            >
              <Text
                style={[styles.statLabel, stat.emphasised && { color: colors.amber }]}
              >
                {stat.label}
              </Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={[styles.statHint, stat.emphasised && { color: colors.amber }]}>
                {stat.hint}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.gutter, styles.block]}>
          <Section
            title="Today"
            actionLabel="Availability"
            onActionPress={() => router.push("/law/availability")}
          >
            <GroupedList>
              {SCHEDULE.map((entry, index) => (
                <View key={entry.id}>
                  <ScheduleRow
                    time={entry.time}
                    meridiem={entry.meridiem}
                    title={entry.title}
                    detail={entry.detail}
                    kind={entry.kind}
                  />
                  {index < SCHEDULE.length - 1 ? <Rule /> : null}
                </View>
              ))}
            </GroupedList>
          </Section>
        </View>

        <View style={[styles.gutter, styles.block]}>
          <Section
            title="Waiting on you"
            actionLabel="See all"
            onActionPress={() => router.navigate("/inbox")}
          >
            <View style={styles.waiting}>
              {waiting.length > 0 ? (
                waiting.map((request) => (
                  <Pressable
                    key={request.id}
                    onPress={() => router.navigate("/inbox")}
                    accessibilityRole="button"
                    accessibilityLabel={`${request.name}, ${request.area}`}
                    style={({ pressed }) => [styles.waitingRow, pressed && { borderColor: colors.ink }]}
                  >
                    <Avatar source={request.photo} size={46} cornerRadius={13} />
                    <View style={styles.waitingBody}>
                      <Text style={styles.waitingName} numberOfLines={1}>
                        {request.name}
                      </Text>
                      <Text style={styles.waitingMatter} numberOfLines={1}>
                        {request.area}
                      </Text>
                    </View>
                    <Text style={styles.waitingAge}>{request.age}</Text>
                  </Pressable>
                ))
              ) : (
                <Text style={styles.clear}>
                  Nothing waiting. New requests appear here within minutes.
                </Text>
              )}
            </View>
          </Section>
        </View>

        <View style={[styles.gutter, styles.block]}>
          <Button
            label="Write a post"
            icon="edit"
            onPress={() => router.push("/law/write-post")}
          />
        </View>
      </ScreenScroll>
    </Screen>
  );
}

function ScheduleRow({
  time,
  meridiem,
  title,
  detail,
  kind,
}: {
  time: string;
  meridiem: string;
  title: string;
  detail: string;
  kind: ScheduleKind;
}) {
  // A deadline is the only entry that can be missed, so it is the only one
  // that gets the strong tone.
  const due = kind === "DUE";

  return (
    <View style={styles.scheduleRow}>
      <View style={[styles.time, { backgroundColor: due ? colors.tint : colors.surface }]}>
        <Text style={styles.timeValue}>{time}</Text>
        <Text style={[styles.meridiem, { color: due ? colors.amber : colors.textMuted }]}>
          {meridiem}
        </Text>
      </View>
      <View style={styles.scheduleBody}>
        <Text style={styles.scheduleTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.scheduleDetail} numberOfLines={1}>
          {detail}
        </Text>
      </View>
      <Pill label={kind} tone={due ? "strong" : "muted"} />
    </View>
  );
}

const styles = StyleSheet.create({
  gutter: {
    paddingHorizontal: layout.gutter,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg - 2,
  },
  brand: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  brandBody: {
    flex: 1,
    minWidth: 0,
  },
  brandLabel: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11,
    letterSpacing: 0.66,
    color: colors.textMuted,
  },
  brandName: {
    ...type.bodySemi,
    letterSpacing: -0.15,
  },
  planBanner: {
    paddingBottom: spacing.lg,
  },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm + 2,
    paddingTop: spacing.lg,
  },
  stat: {
    // Two per row, allowing for the 10px gap.
    width: "48%",
    flexGrow: 1,
    gap: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
  statEmphasised: {
    borderColor: colors.ink,
    backgroundColor: colors.tint,
  },
  statLabel: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 11.5,
    letterSpacing: 0.46,
    color: colors.textMuted,
  },
  statValue: {
    ...type.stat,
    fontSize: 26,
    lineHeight: 28,
  },
  statHint: {
    ...type.caption,
    lineHeight: 17,
  },
  block: {
    paddingTop: spacing.xxl,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    minHeight: 62,
    paddingVertical: spacing.md,
    paddingHorizontal: 15,
  },
  time: {
    width: 54,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm + 2,
  },
  timeValue: {
    ...type.bodySemi,
    fontFamily: type.h3.fontFamily,
    fontSize: 13,
  },
  meridiem: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 10,
    letterSpacing: 0.4,
  },
  scheduleBody: {
    flex: 1,
    minWidth: 0,
  },
  scheduleTitle: {
    ...type.bodySemi,
    fontSize: 14.5,
  },
  scheduleDetail: {
    ...type.caption,
    fontSize: 12.5,
    marginTop: 2,
  },
  waiting: {
    gap: spacing.sm + 2,
  },
  waitingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: 13,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
  waitingBody: {
    flex: 1,
    minWidth: 0,
  },
  waitingName: {
    ...type.bodySemi,
    fontSize: 14.5,
  },
  waitingMatter: {
    ...type.caption,
    fontSize: 12.5,
    marginTop: 3,
  },
  waitingAge: {
    ...type.caption,
    color: colors.amber,
    flexShrink: 0,
  },
  clear: {
    ...type.lede,
    color: colors.textMuted,
  },
});
