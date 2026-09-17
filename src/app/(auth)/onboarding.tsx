// The three-slide introduction.

import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Button, Screen, Wordmark } from "@/components/ui";
import { ONBOARDING } from "@/data";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const slide = ONBOARDING[index];
  const isLast = index === ONBOARDING.length - 1;

  const next = () => (isLast ? router.replace("/login") : setIndex(index + 1));

  return (
    <Screen edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Wordmark size={34} />
        <Pressable
          onPress={() => router.replace("/login")}
          accessibilityRole="button"
          hitSlop={8}
          style={({ pressed }) => [styles.skip, pressed && styles.pressed]}
        >
          <Text style={styles.skipLabel}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.artWrap}>
        <Image source={slide.image} style={styles.art} contentFit="cover" transition={200} />
      </View>

      <View style={styles.copy}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {ONBOARDING.map((item, i) => (
            <View
              key={item.title}
              style={[
                styles.dot,
                {
                  width: i === index ? 22 : 6,
                  backgroundColor: i === index ? colors.yellow : colors.border,
                },
              ]}
            />
          ))}
        </View>
        <Button
          label={isLast ? "Get started" : "Next"}
          icon="arrow-right"
          onPress={next}
          block={false}
          style={styles.cta}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: layout.gutter,
    paddingTop: 18,
    paddingBottom: spacing.sm,
  },
  skip: {
    minHeight: layout.touchTarget,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  skipLabel: {
    ...type.bodyMedium,
    fontSize: 14,
    color: colors.textMuted,
  },
  artWrap: {
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.xxs,
  },
  art: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 360,
    borderRadius: radius.sheet,
    backgroundColor: colors.tint,
  },
  copy: {
    gap: spacing.md,
    paddingHorizontal: spacing.xxl - 2,
    paddingTop: spacing.xxl,
  },
  title: {
    ...type.display,
  },
  body: {
    ...type.body,
    color: colors.textBody,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xl,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.lg,
    paddingHorizontal: spacing.xxl - 2,
    paddingBottom: spacing.xxl,
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  cta: {
    minHeight: 52,
    borderRadius: radius.xxl + 6,
    paddingHorizontal: spacing.xxl,
  },
  pressed: {
    opacity: 0.6,
  },
});
