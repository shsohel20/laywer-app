// Compose a post for the public feed.

import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import {
  BackHeader,
  Button,
  Chip,
  ChipRail,
  Icon,
  Lede,
  Screen,
  ScreenScroll,
  TextField,
} from "@/components/ui";
import { PERIOD_RESETS, PUBLISHABLE_CATEGORIES } from "@/data";
import { useSubscription } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function WritePostScreen() {
  const [category, setCategory] = useState(PUBLISHABLE_CATEGORIES[0]);
  const { plan, canPublishPost, postsRemaining, publishPost } = useSubscription();

  return (
    <Screen>
      <BackHeader title="Write a post" size="sm" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenScroll>
          <Lede>
            Posts appear in the public feed under your name. Plain language reaches more clients
            than case citations.
          </Lede>

          <View style={styles.form}>
            <View style={styles.categoryBlock}>
              <Text style={styles.label}>Category</Text>
              <ChipRail>
                {PUBLISHABLE_CATEGORIES.map((name) => (
                  <Chip
                    key={name}
                    label={name}
                    tone="soft"
                    size="md"
                    selected={category === name}
                    onPress={() => setCategory(name)}
                  />
                ))}
              </ChipRail>
            </View>

            <TextField label="Headline" rows={2} placeholder="What changed, and who it affects" />

            <View style={styles.coverBlock}>
              <Text style={styles.label}>Cover image</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add a cover image"
                style={({ pressed }) => [styles.cover, pressed && { borderColor: colors.ink }]}
              >
                <View style={styles.coverIcon}>
                  <Icon name="image" size={20} color={colors.amber} />
                </View>
                <Text style={styles.coverTitle}>Add a cover image</Text>
                <Text style={styles.coverHint}>Landscape, at least 1200px wide</Text>
              </Pressable>
            </View>

            <TextField
              label="Body"
              rows={9}
              placeholder="Open with the practical consequence, then the detail."
            />

            <View style={styles.notice}>
              <Icon name="alert" size={17} color={colors.amber} />
              <Text style={styles.noticeText}>
                Posts are general information, not advice to a named client. Anything identifying
                a matter you act on will be removed.
              </Text>
            </View>

            {plan.postLimit !== null ? (
              <Text style={styles.allowance}>
                {canPublishPost
                  ? `${postsRemaining} of ${plan.postLimit} posts left this month on ${plan.name}.`
                  : `You have used this month's post on ${plan.name}. Resets ${PERIOD_RESETS}.`}
              </Text>
            ) : null}

            <View style={styles.actions}>
              <Button
                label="Save draft"
                variant="quiet"
                onPress={() => router.back()}
                block={false}
                style={styles.draftButton}
              />
              <Button
                label={canPublishPost ? "Publish" : "Upgrade to publish"}
                onPress={() => {
                  if (!canPublishPost) {
                    router.push("/law/subscription");
                    return;
                  }
                  publishPost();
                  router.navigate("/posts");
                }}
                style={styles.publishButton}
              />
            </View>
          </View>
        </ScreenScroll>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  form: {
    gap: 18,
    paddingHorizontal: layout.gutter,
  },
  label: {
    ...type.fieldLabel,
  },
  categoryBlock: {
    gap: spacing.sm + 2,
  },
  coverBlock: {
    gap: spacing.sm,
  },
  cover: {
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    minHeight: 128,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  coverIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.tint,
  },
  coverTitle: {
    ...type.bodySemi,
    fontSize: 13.5,
  },
  coverHint: {
    ...type.caption,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingVertical: spacing.lg - 2,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
  },
  noticeText: {
    ...type.caption,
    flex: 1,
    minWidth: 0,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textBody,
  },
  allowance: {
    ...type.caption,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.amber,
  },
  actions: {
    flexDirection: "row",
    gap: 9,
  },
  draftButton: {
    minHeight: 52,
  },
  publishButton: {
    flex: 1,
    minHeight: 52,
  },
});
