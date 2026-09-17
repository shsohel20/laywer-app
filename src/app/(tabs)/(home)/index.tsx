// Home: nearby and popular lawyers, the category rails, and the latest posts.

import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AreaTile } from "@/components/law/AreaTile";
import { FilterSheet } from "@/components/law/FilterSheet";
import { LawyerPortrait } from "@/components/law/LawyerPortrait";
import { PostTile } from "@/components/law/PostCard";
import {
  Icon,
  IconButton,
  Screen,
  ScreenScroll,
  SearchField,
  Section,
  Wordmark,
} from "@/components/ui";
import { FEATURED_AREAS, HOME_POSTS, NEARBY_LAWYERS, POPULAR_LAWYERS } from "@/data";
import { useBadges } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { hasUnreadAlerts } = useBadges();

  const openLawyer = (id: string) => router.push(`/lawyer/${id}`);
  const openPost = (id: string) => router.push(`/posts/${id}`);

  return (
    <Screen>
      <ScreenScroll>
        <View style={styles.header}>
          <Wordmark size={36} />
          <View style={styles.headerActions}>
            <Pressable
              onPress={() => setFilterOpen(true)}
              accessibilityRole="button"
              accessibilityLabel="Change location"
              style={({ pressed }) => [styles.location, pressed && styles.pressed]}
            >
              <Icon name="send" size={14} color={colors.ink} />
              <Text style={styles.locationLabel}>Newyork, USA</Text>
            </Pressable>
            <IconButton
              icon="bell"
              label="Notifications"
              onPress={() => router.push("/alerts")}
              badged={hasUnreadAlerts}
            />
          </View>
        </View>

        <View style={styles.searchWrap}>
          <SearchField
            value={query}
            onChangeText={setQuery}
            placeholder="Search lawyers, posts"
            onFilterPress={() => setFilterOpen(true)}
          />
        </View>

        <Section
          title="Nearby"
          actionLabel="See all"
          onActionPress={() => router.navigate("/lawyers")}
          style={styles.section}
        />
        <Rail>
          {NEARBY_LAWYERS.map((lawyer) => (
            <LawyerPortrait
              key={lawyer.id}
              lawyer={lawyer}
              onPress={() => openLawyer(lawyer.id)}
            />
          ))}
        </Rail>

        <Section title="Categories" style={styles.section} />
        <Rail gap={spacing.sm + 2}>
          {FEATURED_AREAS.map((area) => (
            <AreaTile
              key={area.id}
              area={area}
              onPress={() => router.navigate("/lawyers")}
            />
          ))}
        </Rail>

        <Section
          title="Popular"
          actionLabel="See all"
          onActionPress={() => router.navigate("/lawyers")}
          style={styles.section}
        />
        <Rail>
          {POPULAR_LAWYERS.map((lawyer) => (
            <LawyerPortrait
              key={`popular-${lawyer.id}`}
              lawyer={lawyer}
              useAltPhoto
              onPress={() => openLawyer(lawyer.id)}
            />
          ))}
        </Rail>

        <Section
          title="Law Posts"
          actionLabel="See all"
          onActionPress={() => router.navigate("/posts")}
          style={styles.section}
        />
        <View style={styles.postGrid}>
          {HOME_POSTS.map((post) => (
            <PostTile key={post.id} post={post} onPress={() => openPost(post.id)} />
          ))}
        </View>
      </ScreenScroll>

      <FilterSheet visible={filterOpen} onClose={() => setFilterOpen(false)} />
    </Screen>
  );
}

/** A horizontal rail that runs to both screen edges rather than clipping. */
function Rail({ children, gap = spacing.md }: { children: React.ReactNode; gap?: number }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.rail}
      contentContainerStyle={[styles.railContent, { gap }]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    minHeight: layout.touchTarget,
    paddingHorizontal: spacing.lg - 2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  locationLabel: {
    ...type.captionMedium,
    fontSize: 13,
    color: colors.textStrong,
  },
  searchWrap: {
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.xxs,
    paddingBottom: 18,
  },
  section: {
    paddingHorizontal: layout.gutter,
  },
  rail: {
    flexGrow: 0,
    marginBottom: spacing.xl + spacing.sm,
  },
  railContent: {
    paddingHorizontal: layout.gutter,
  },
  postGrid: {
    flexDirection: "row",
    gap: spacing.lg - 2,
    paddingHorizontal: layout.gutter,
  },
  pressed: {
    opacity: 0.6,
  },
});
