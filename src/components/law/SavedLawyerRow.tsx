// A row on the Saved lawyers shortlist.

import { Pressable, StyleSheet, Text, View } from "react-native";

import { Avatar, Icon } from "@/components/ui";
import { colors, radius, spacing, type } from "@/theme";
import type { Lawyer } from "@/types";

export interface SavedLawyerRowProps {
  lawyer: Lawyer;
  onOpen: () => void;
  onRemove: () => void;
}

export function SavedLawyerRow({ lawyer, onOpen, onRemove }: SavedLawyerRowProps) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onOpen}
        accessibilityRole="button"
        accessibilityLabel={lawyer.name}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <Avatar source={lawyer.photo} size={54} cornerRadius={radius.md} />
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>
            {lawyer.name}
          </Text>
          <Text style={styles.specialism} numberOfLines={1}>
            {lawyer.specialism}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {lawyer.location} · {lawyer.rating.toFixed(1)} ★
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onRemove}
        accessibilityRole="button"
        accessibilityLabel={`Remove ${lawyer.name} from your shortlist`}
        hitSlop={4}
        style={({ pressed }) => [styles.remove, pressed && styles.pressed]}
      >
        <Icon name="close" size={17} color={colors.textMuted} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    padding: 13,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.xl,
  },
  main: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    ...type.bodySemi,
    fontSize: 15.5,
    letterSpacing: -0.16,
  },
  specialism: {
    ...type.caption,
    fontSize: 13,
    color: colors.amber,
    marginTop: 3,
  },
  meta: {
    ...type.caption,
    marginTop: 3,
  },
  remove: {
    width: 44,
    height: 44,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
  },
  pressed: {
    opacity: 0.6,
  },
});
