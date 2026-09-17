// Form inputs: a labelled text field, and the rounded search field used at the
// top of the home, lawyers, messages and help screens.

import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

import { colors, layout, radius, spacing, type } from "@/theme";

import { Icon } from "./Icon";

export interface TextFieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  /** Renders a textarea of this many rows instead of a single line. */
  rows?: number;
  style?: StyleProp<ViewStyle>;
}

export function TextField({ label, rows, style, ...input }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const multiline = typeof rows === "number";

  return (
    <View style={[styles.field, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...input}
        multiline={multiline}
        numberOfLines={rows}
        onFocus={(event) => {
          setFocused(true);
          input.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          input.onBlur?.(event);
        }}
        placeholderTextColor={colors.placeholder}
        style={[
          styles.input,
          multiline ? { minHeight: 26 * rows, paddingTop: 13 } : null,
          multiline ? styles.multiline : null,
          focused ? styles.inputFocused : null,
        ]}
      />
    </View>
  );
}

/** The solid black icon button that opens the filter sheet. */
export function FilterButton({
  onPress,
  size = layout.fieldHeight,
}: {
  onPress: () => void;
  size?: number;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Filters"
      style={({ pressed }) => [
        styles.filterButton,
        { width: size, height: size, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <Icon name="sliders" size={19} color={colors.white} accent={colors.yellow} />
    </Pressable>
  );
}

export interface SearchFieldProps extends Omit<TextInputProps, "style"> {
  /** When given, the black filter button is shown beside the field. */
  onFilterPress?: () => void;
}

export function SearchField({ onFilterPress, ...input }: SearchFieldProps) {
  return (
    <View style={styles.searchRow}>
      <View style={styles.search}>
        <Icon name="search" size={18} color={colors.textMuted} />
        <TextInput
          {...input}
          placeholderTextColor={colors.placeholder}
          returnKeyType="search"
          style={styles.searchInput}
        />
      </View>
      {onFilterPress ? <FilterButton onPress={onFilterPress} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.sm,
  },
  label: {
    ...type.fieldLabel,
  },
  input: {
    ...type.body,
    minHeight: layout.inputHeight,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    color: colors.text,
  },
  multiline: {
    textAlignVertical: "top",
  },
  inputFocused: {
    borderColor: colors.ink,
  },
  searchRow: {
    flexDirection: "row",
    gap: spacing.sm + 2,
  },
  search: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
    minHeight: layout.fieldHeight,
    paddingHorizontal: spacing.lg - 2,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  searchInput: {
    ...type.body,
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
    color: colors.text,
  },
  filterButton: {
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: colors.ink,
  },
});
