// Browse lawyers: search, the active-filter chips, and the result list.
//
// Uses FlatList rather than a ScrollView: this is the one list in the app that
// is expected to grow with the directory.

import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { FilterSheet } from "@/components/law/FilterSheet";
import { LawyerCard } from "@/components/law/LawyerCard";
import {
  Chip,
  ChipRail,
  EmptyState,
  Screen,
  ScreenHeader,
  SearchField,
} from "@/components/ui";
import { LAWYERS, areaById } from "@/data";
import { useFilters } from "@/state/app-state";
import { layout, spacing } from "@/theme";
import type { Lawyer } from "@/types";

export default function LawyersScreen() {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { filters, toggleFilterArea, clearFilterAreas } = useFilters();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return LAWYERS.filter((lawyer) => {
      if (filters.areaIds.length > 0 && !filters.areaIds.includes(lawyer.area)) return false;
      if (lawyer.rating < filters.minRating) return false;
      if (!term) return true;
      return (
        lawyer.name.toLowerCase().includes(term) ||
        lawyer.specialism.toLowerCase().includes(term) ||
        lawyer.location.toLowerCase().includes(term)
      );
    });
  }, [query, filters]);

  const renderItem = ({ item }: { item: Lawyer }) => (
    <LawyerCard
      lawyer={item}
      onOpen={() => router.push(`/lawyer/${item.id}`)}
      onMessage={() => router.push(`/chat/${item.id}`)}
    />
  );

  return (
    <Screen>
      <FlatList
        data={results}
        keyExtractor={(lawyer) => lawyer.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={
          <View>
            <ScreenHeader title="Lawyers" flush />
            <View style={styles.controls}>
              <SearchField
                value={query}
                onChangeText={setQuery}
                placeholder="Search lawyers"
                onFilterPress={() => setFilterOpen(true)}
              />
            </View>
            <ChipRail style={styles.chips}>
              <Chip
                label="All"
                selected={filters.areaIds.length === 0}
                onPress={clearFilterAreas}
              />
              {(["family", "business", "criminal"] as const).map((id) => (
                <Chip
                  key={id}
                  label={areaById(id).name}
                  selected={filters.areaIds.includes(id)}
                  onPress={() => toggleFilterArea(id)}
                />
              ))}
              <Chip label={filters.sort} selected onPress={() => setFilterOpen(true)} />
            </ChipRail>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="nav-lawyers"
            message="No lawyers match those filters. Try widening the category or the rating."
            actionLabel="Reset filters"
            onActionPress={() => setFilterOpen(true)}
          />
        }
      />

      <FilterSheet visible={filterOpen} onClose={() => setFilterOpen(false)} />
    </Screen>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.xl,
  },
  controls: {
    paddingBottom: spacing.lg - 2,
  },
  chips: {
    marginBottom: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
});
