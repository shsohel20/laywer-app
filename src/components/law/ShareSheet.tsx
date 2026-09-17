// The share sheet on a post.
//
// The targets are presentational only — wiring them up means expo-sharing plus
// per-network deep links, which is a separate piece of work from the redesign.

import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Button, Sheet } from "@/components/ui";
import { SHARE_TARGETS } from "@/data";
import { colors, radius, spacing, type } from "@/theme";
import type { Post } from "@/types";

export interface ShareSheetProps {
  visible: boolean;
  onClose: () => void;
  post: Post;
}

export function ShareSheet({ visible, onClose, post }: ShareSheetProps) {
  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title="Share post"
      scroll={false}
      footer={<Button label="Cancel" onPress={onClose} variant="quiet" size="md" style={styles.cancel} />}
    >
      <View style={styles.preview}>
        <Image source={post.cover} style={styles.cover} contentFit="cover" />
        <Text style={styles.previewTitle} numberOfLines={2}>
          {post.title}
        </Text>
      </View>

      <View style={styles.grid}>
        {SHARE_TARGETS.map((target) => (
          <Pressable
            key={target.id}
            accessibilityRole="button"
            accessibilityLabel={target.label}
            style={({ pressed }) => [styles.target, pressed && styles.pressed]}
          >
            <View
              style={[
                styles.mark,
                { backgroundColor: target.tinted ? colors.tint : colors.surface },
              ]}
            >
              <Text
                style={[
                  styles.markLabel,
                  { color: target.tinted ? colors.ink : colors.textStrong },
                ]}
              >
                {target.mark}
              </Text>
            </View>
            <Text style={styles.targetLabel}>{target.label}</Text>
          </Pressable>
        ))}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  preview: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  cover: {
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: spacing.sm + 2,
  },
  previewTitle: {
    ...type.bodySemi,
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    lineHeight: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: spacing.md,
  },
  target: {
    width: "33.333%",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    minHeight: 92,
    paddingVertical: spacing.md,
  },
  mark: {
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    borderRadius: radius.full,
  },
  markLabel: {
    ...type.bodySemi,
    fontFamily: type.h3.fontFamily,
    fontSize: 15,
  },
  targetLabel: {
    ...type.captionMedium,
    color: colors.textStrong,
  },
  cancel: {
    flex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
});
