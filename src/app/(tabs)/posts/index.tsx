// The law-post feed, filtered by category.

import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { FilterSheet } from "@/components/law/FilterSheet";
import { PostCard } from "@/components/law/PostCard";
import {
  Chip,
  ChipRail,
  EmptyState,
  FilterButton,
  Screen,
  ScreenHeader,
  ScreenScroll,
} from "@/components/ui";
import { POSTS, POST_CATEGORIES } from "@/data";
import { layout, spacing } from "@/theme";

const ALL = "All";

export default function PostsScreen() {
  const [category, setCategory] = useState(ALL);
  const [filterOpen, setFilterOpen] = useState(false);

  const posts = useMemo(
    () => (category === ALL ? POSTS : POSTS.filter((post) => post.category === category)),
    [category],
  );

  return (
    <Screen>
      <ScreenHeader
        title="Law Posts"
        trailing={<FilterButton onPress={() => setFilterOpen(true)} size={44} />}
      />

      <ScreenScroll>
        <View style={styles.chips}>
          <ChipRail>
            {[ALL, ...POST_CATEGORIES].map((name) => (
              <Chip
                key={name}
                label={name}
                selected={category === name}
                onPress={() => setCategory(name)}
              />
            ))}
          </ChipRail>
        </View>

        <View style={styles.list}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => router.push(`/posts/${post.id}`)}
              />
            ))
          ) : (
            <EmptyState icon="doc" message="No posts in this category yet." />
          )}
        </View>
      </ScreenScroll>

      <FilterSheet visible={filterOpen} onClose={() => setFilterOpen(false)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.lg,
  },
  list: {
    gap: spacing.lg,
    paddingHorizontal: layout.gutter,
  },
});
