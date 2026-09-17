// The lawyer's request inbox: accept, ask a question, or decline.

import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { InboxCard } from "@/components/law/RequestCards";
import {
  Chip,
  ChipRail,
  EmptyState,
  Icon,
  Pill,
  Screen,
  ScreenHeader,
  ScreenScroll,
} from "@/components/ui";
import { INBOX_FILTERS, INBOX_REQUESTS, PERIOD_RESETS, type InboxFilter } from "@/data";
import { useInbox, useSubscription } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function InboxScreen() {
  const [filter, setFilter] = useState<InboxFilter>("New");
  const { inboxStatusFor, setInboxStatus, newRequestCount } = useInbox();
  const { plan, canAcceptRequest, requestsUsed } = useSubscription();

  const requests = useMemo(
    () =>
      INBOX_REQUESTS.filter(
        (request) =>
          filter === "All" || inboxStatusFor(request.id) === filter.toLowerCase(),
      ),
    [filter, inboxStatusFor],
  );

  return (
    <Screen>
      <ScreenHeader
        title="Requests"
        trailing={
          <Pill
            label={newRequestCount > 0 ? `${newRequestCount} new` : "All clear"}
            tone={newRequestCount > 0 ? "strong" : "muted"}
          />
        }
      />

      <ScreenScroll>
        <Text style={styles.lede}>
          Accepting starts a confidential thread. Declining releases the client to approach
          someone else.
        </Text>

        {!canAcceptRequest ? (
          <Pressable
            onPress={() => router.push("/law/subscription")}
            accessibilityRole="button"
            style={({ pressed }) => [styles.capNotice, pressed && styles.pressed]}
          >
            <Icon name="alert" size={17} color={colors.ink} />
            <View style={styles.capBody}>
              <Text style={styles.capTitle}>
                {requestsUsed} of {plan.requestLimit} requests used
              </Text>
              <Text style={styles.capHint}>
                New requests still arrive and you can still reply — accepting resumes{" "}
                {PERIOD_RESETS}, or upgrade now.
              </Text>
            </View>
            <Icon name="chevron-right" size={17} color={colors.ink} />
          </Pressable>
        ) : null}

        <View style={styles.chips}>
          <ChipRail>
            {INBOX_FILTERS.map((name) => (
              <Chip
                key={name}
                label={name}
                selected={filter === name}
                onPress={() => setFilter(name)}
              />
            ))}
          </ChipRail>
        </View>

        <View style={styles.list}>
          {requests.length > 0 ? (
            requests.map((request) => (
              <InboxCard
                key={request.id}
                request={request}
                status={inboxStatusFor(request.id)}
                canAccept={canAcceptRequest}
                onAccept={() => {
                  setInboxStatus(request.id, "accepted");
                  router.navigate("/messages");
                }}
                onUpgrade={() => router.push("/law/subscription")}
                // Asking a question opens a thread but leaves the request
                // undecided — it is not an acceptance, and must not spend the
                // monthly allowance.
                onAsk={() => router.push("/chat/filips")}
                onDecline={() => setInboxStatus(request.id, "declined")}
                onReconsider={() => {
                  setInboxStatus(request.id, "new");
                  setFilter("New");
                }}
                onOpenThread={() => router.navigate("/messages")}
              />
            ))
          ) : (
            <EmptyState
              icon="check"
              message="Nothing in this queue. New requests appear here within minutes of a client sending them."
            />
          )}
        </View>
      </ScreenScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lede: {
    ...type.lede,
    fontSize: 13.5,
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.lg - 2,
  },
  capNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginHorizontal: layout.gutter,
    marginBottom: spacing.lg,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.ink,
    borderRadius: radius.lg,
    backgroundColor: colors.tint,
  },
  capBody: {
    flex: 1,
    minWidth: 0,
  },
  capTitle: {
    ...type.bodySemi,
    fontSize: 14,
  },
  capHint: {
    ...type.caption,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.amber,
    marginTop: 3,
  },
  pressed: {
    opacity: 0.85,
  },
  chips: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
    paddingHorizontal: layout.gutter,
  },
});
