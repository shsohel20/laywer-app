// The shortlist.

import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { SavedLawyerRow } from "@/components/law/SavedLawyerRow";
import { BackHeader, EmptyState, Lede, Screen, ScreenScroll } from "@/components/ui";
import { lawyerById } from "@/data";
import { useSaved } from "@/state/app-state";
import { layout, spacing } from "@/theme";
import type { Lawyer } from "@/types";

export default function SavedScreen() {
  const { savedLawyerIds, toggleSaved } = useSaved();

  const lawyers = savedLawyerIds
    .map((id) => lawyerById(id))
    .filter((lawyer): lawyer is Lawyer => lawyer !== undefined);

  return (
    <Screen>
      <BackHeader title="Saved lawyers" size="sm" />
      <ScreenScroll>
        <Lede>Your shortlist. Nothing here is contacted until you send a request.</Lede>

        <View style={styles.list}>
          {lawyers.length > 0 ? (
            lawyers.map((lawyer) => (
              <SavedLawyerRow
                key={lawyer.id}
                lawyer={lawyer}
                onOpen={() => router.push(`/lawyer/${lawyer.id}`)}
                onRemove={() => toggleSaved(lawyer.id)}
              />
            ))
          ) : (
            <EmptyState
              icon="heart"
              message="No saved lawyers yet. Tap the heart on a profile to add one."
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
  list: {
    gap: spacing.md,
    paddingHorizontal: layout.gutter,
  },
});
