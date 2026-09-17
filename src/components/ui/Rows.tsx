// The three list rows the settings screens are built from.

import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, layout, radius, spacing, type } from "@/theme";

import { Icon, type IconName } from "./Icon";
import { Toggle } from "./Toggle";

export interface SettingsRowProps {
  icon: IconName;
  label: string;
  hint: string;
  /** Trailing value before the chevron, e.g. "12" or "On". */
  value?: string;
  onPress?: () => void;
}

export function SettingsRow({ icon, label, hint, value, onPress }: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.mark}>
        <Icon name={icon} size={17} color={colors.amber} strokeWidth={1.9} />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      <Icon name="chevron-right" size={17} color={colors.textDisabled} />
    </Pressable>
  );
}

export interface ToggleRowProps {
  label: string;
  hint: string;
  on: boolean;
  onPress: () => void;
}

export function ToggleRow({ label, hint, on, onPress }: ToggleRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityHint={hint}
      accessibilityState={{ checked: on }}
      style={({ pressed }) => [styles.row, styles.toggleRow, pressed && styles.pressed]}
    >
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      <Toggle on={on} />
    </Pressable>
  );
}

export interface CheckRowProps {
  label: string;
  hint: string;
  checked: boolean;
  onPress: () => void;
}

/** The tick-box row on the Practice areas preference screen. */
export function CheckRow({ label, hint, checked, onPress }: CheckRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked }}
      style={({ pressed }) => [styles.checkRow, pressed && styles.pressed]}
    >
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      <View
        style={[
          styles.box,
          {
            borderColor: checked ? colors.ink : colors.border,
            backgroundColor: checked ? colors.yellow : colors.white,
          },
        ]}
      >
        {checked ? <Icon name="check" size={14} color={colors.ink} strokeWidth={3} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    minHeight: layout.rowHeight,
    paddingVertical: spacing.md - 1,
    paddingHorizontal: 15,
  },
  toggleRow: {
    minHeight: 62,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    minHeight: 60,
    paddingVertical: spacing.md,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  mark: {
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    flexShrink: 0,
    borderRadius: radius.sm - 1,
    backgroundColor: colors.tint,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    ...type.bodyMedium,
    lineHeight: 20,
  },
  hint: {
    ...type.caption,
    fontSize: 12.5,
    lineHeight: 17,
    marginTop: 2,
  },
  value: {
    ...type.captionMedium,
    fontSize: 13,
    flexShrink: 0,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    flexShrink: 0,
    borderWidth: 1.5,
    borderRadius: spacing.sm,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
});
