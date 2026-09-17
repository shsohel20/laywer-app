// The practice-area tile in the Categories rail on the home screen.

import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui";
import { colors, radius, spacing, type } from "@/theme";
import type { PracticeArea } from "@/types";

export interface AreaTileProps {
  area: PracticeArea;
  onPress: () => void;
}

export function AreaTile({ area, onPress }: AreaTileProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${area.name}, ${area.lawyerCount} lawyers`}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={styles.badge}>
        <Icon name={area.icon} size={19} color={colors.ink} strokeWidth={1.8} />
      </View>
      <View>
        <Text style={styles.name}>{area.name}</Text>
        <Text style={styles.count}>{area.lawyerCount} lawyers</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 124,
    minHeight: 96,
    flexShrink: 0,
    gap: spacing.sm + 2,
    padding: 13,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
  badge: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: colors.tint,
  },
  name: {
    ...type.bodySemi,
    fontSize: 14,
  },
  count: {
    ...type.caption,
    marginTop: 2,
  },
  pressed: {
    borderColor: colors.ink,
  },
});
