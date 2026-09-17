// Posts in the feed, and the smaller two-up tile on the home screen.

import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Avatar, CategoryPill } from "@/components/ui";
import { cardShadow, colors, radius, spacing, type } from "@/theme";
import type { Post } from "@/types";

export interface PostCardProps {
  post: Post;
  onPress: () => void;
}

export function PostCard({ post, onPress }: PostCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={post.title}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={post.cover} style={styles.cover} contentFit="cover" transition={150} />
      <View style={styles.body}>
        <CategoryPill label={post.category} />
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.byline}>
          <Avatar source={post.authorPhoto} size={22} shape="circle" />
          <Text style={styles.author}>{post.author}</Text>
          <View style={styles.dot} />
          <Text style={styles.date}>{post.date}</Text>
        </View>
      </View>
    </Pressable>
  );
}

/** The compact grid tile used at the bottom of the home screen. */
export function PostTile({ post, onPress }: PostCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={post.title}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <Image source={post.cover} style={styles.tileCover} contentFit="cover" transition={150} />
      <Text style={styles.tileTitle}>{post.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.xl,
    overflow: "hidden",
    backgroundColor: colors.white,
    ...cardShadow,
  },
  cover: {
    width: "100%",
    aspectRatio: 2,
    backgroundColor: colors.surface,
  },
  body: {
    gap: spacing.sm + 2,
    paddingHorizontal: 15,
    paddingTop: spacing.lg - 2,
    paddingBottom: 15,
  },
  title: {
    ...type.h3,
    fontSize: 18.1,
    lineHeight: 22,
  },
  byline: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  author: {
    ...type.captionMedium,
    color: colors.textBody,
  },
  date: {
    ...type.caption,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  tile: {
    flex: 1,
    gap: 9,
  },
  tileCover: {
    width: "100%",
    aspectRatio: 1.6,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  tileTitle: {
    ...type.h3,
    fontSize: 13.8,
    lineHeight: 17,
    letterSpacing: -0.35,
  },
  pressed: {
    opacity: 0.85,
  },
});
