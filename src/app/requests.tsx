// The client's own requests, by status.

import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ClientRequestCard } from "@/components/law/RequestCards";
import {
  BackHeader,
  Chip,
  ChipRail,
  EmptyState,
  Screen,
  ScreenScroll,
} from "@/components/ui";
import { CLIENT_REQUESTS, REQUEST_FILTERS, type RequestFilter } from "@/data";
import { layout, spacing } from "@/theme";

export default function RequestsScreen() {
  const [filter, setFilter] = useState<RequestFilter>("All");

  const requests = useMemo(
    () =>
      CLIENT_REQUESTS.filter(
        (request) => filter === "All" || request.status === filter.toLowerCase(),
      ),
    [filter],
  );

  return (
    <Screen>
      <BackHeader title="My requests" size="sm" />
      <ScreenScroll>
        <View style={styles.chips}>
          <ChipRail>
            {REQUEST_FILTERS.map((name) => (
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
              <ClientRequestCard
                key={request.id}
                request={request}
                onAction={() => {
                  if (request.status === "accepted") router.push(`/chat/${request.lawyerId}`);
                  else if (request.status === "declined") router.navigate("/lawyers");
                }}
              />
            ))
          ) : (
            <EmptyState
              icon="doc"
              message="Nothing with that status yet."
              actionLabel="Browse lawyers"
              onActionPress={() => router.navigate("/lawyers")}
            />
          )}
        </View>
      </ScreenScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: {
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
    paddingHorizontal: layout.gutter,
  },
});
