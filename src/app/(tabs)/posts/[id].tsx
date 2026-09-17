// A single law post.

import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ShareSheet } from "@/components/law/ShareSheet";
import {
  Avatar,
  CategoryPill,
  EmptyState,
  Icon,
  IconButton,
  Screen,
  ScreenScroll,
} from "@/components/ui";
import { postById } from "@/data";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [shareOpen, setShareOpen] = useState(false);
  const post = postById(id);

  if (!post) {
    return (
      <Screen>
        <EmptyState
          icon="doc"
          message="That post is no longer available."
          actionLabel="Back to posts"
          onActionPress={() => router.navigate("/posts")}
        />
      </Screen>
    );
  }

  return (
    <Screen edges={[]}>
      <ScreenScroll>
        <View>
          <Image source={post.cover} style={styles.cover} contentFit="cover" transition={150} />
          <View style={styles.coverActions}>
            <IconButton
              icon="arrow-left"
              label="Go back"
              variant="dark"
              iconSize={20}
              onPress={() => router.back()}
            />
            <IconButton
              icon="share"
              label="Share this post"
              variant="dark"
              color={colors.yellow}
              onPress={() => setShareOpen(true)}
            />
          </View>
        </View>

        <View style={styles.body}>
          <CategoryPill label={post.category} />
          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.byline}>
            <Avatar source={post.authorPhoto} size={34} shape="circle" />
            <View style={styles.bylineBody}>
              <Text style={styles.author}>{post.author}</Text>
              <View style={styles.dateRow}>
                <Icon name="calendar" size={11} color={colors.textMuted} />
                <Text style={styles.date}>{post.date}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => setShareOpen(true)}
              accessibilityRole="button"
              accessibilityLabel="Share this post"
              style={({ pressed }) => [styles.shareButton, pressed && styles.pressed]}
            >
              <Icon name="share" size={14} color={colors.ink} />
              <Text style={styles.shareLabel}>Share</Text>
            </Pressable>
          </View>

          <Text style={styles.prose}>{post.body}</Text>
          <Text style={styles.prose}>{post.body2}</Text>
        </View>
      </ScreenScroll>

      <ShareSheet visible={shareOpen} onClose={() => setShareOpen(false)} post={post} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: "100%",
    aspectRatio: 1.5,
    backgroundColor: colors.tint,
  },
  coverActions: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing.xl + spacing.md,
    paddingHorizontal: spacing.lg - 2,
  },
  body: {
    gap: spacing.lg - 2,
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.xl,
  },
  title: {
    ...type.h1,
    fontSize: 25.8,
    lineHeight: 30,
  },
  byline: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.cream,
  },
  bylineBody: {
    flex: 1,
    minWidth: 0,
  },
  author: {
    ...type.bodySemi,
    fontSize: 14,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 2,
  },
  date: {
    ...type.caption,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    minHeight: 40,
    paddingHorizontal: spacing.lg - 2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  shareLabel: {
    ...type.link,
    color: colors.ink,
  },
  prose: {
    ...type.prose,
  },
  pressed: {
    opacity: 0.6,
  },
});
