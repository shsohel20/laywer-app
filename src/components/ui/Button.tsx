// The button in all the shapes the design uses.
//
// One configurable component rather than PrimaryButton / OutlineButton /
// SmallGhostButton: the design varies only fill, height and radius.

import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, radius as radii, spacing, type } from "@/theme";

import { Icon, type IconName } from "./Icon";

export type ButtonVariant = "primary" | "outline" | "quiet" | "onDark";
export type ButtonSize = "lg" | "md" | "sm";

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  /** Icon tint, when it differs from the label (yellow on the ink cards). */
  iconColor?: string;
  /** Stretch to fill the parent. Standalone form buttons do; inline pairs do not. */
  block?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
}

const HEIGHTS: Record<ButtonSize, number> = { lg: 54, md: 50, sm: 44 };
const RADII: Record<ButtonSize, number> = { lg: radii.md, md: radii.md, sm: radii.sm };

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "lg",
  icon,
  iconColor,
  block = true,
  disabled = false,
  style,
  accessibilityHint,
}: ButtonProps) {
  const height = HEIGHTS[size];
  const corner = RADII[size];

  const fills: Record<ButtonVariant, { bg: string; pressedBg: string; border?: string; fg: string }> =
    {
      primary: {
        bg: colors.yellow,
        pressedBg: colors.yellowPressed,
        fg: colors.ink,
      },
      outline: {
        bg: colors.white,
        pressedBg: colors.surface,
        border: colors.border,
        fg: colors.ink,
      },
      quiet: {
        bg: colors.white,
        pressedBg: colors.surface,
        border: colors.border,
        fg: colors.textBody,
      },
      onDark: {
        bg: colors.onDarkSurface,
        pressedBg: colors.onDarkSurfacePressed,
        fg: colors.white,
      },
    };

  const fill = fills[variant];
  const labelColor = disabled ? colors.textDisabled : fill.fg;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: height,
          borderRadius: corner,
          backgroundColor: disabled ? colors.disabled : pressed ? fill.pressedBg : fill.bg,
          borderWidth: fill.border ? 1 : 0,
          borderColor: pressed && fill.border ? colors.ink : fill.border,
        },
        block ? styles.block : styles.inline,
        style,
      ]}
    >
      {icon ? (
        <View style={styles.icon}>
          <Icon name={icon} size={17} color={iconColor ?? labelColor} />
        </View>
      ) : null}
      <Text style={[size === "sm" ? type.buttonSmall : type.button, { color: labelColor }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  block: {
    alignSelf: "stretch",
  },
  inline: {
    alignSelf: "flex-start",
  },
  icon: {
    // Keeps the label optically centred when an icon is present.
    marginLeft: -2,
  },
});
