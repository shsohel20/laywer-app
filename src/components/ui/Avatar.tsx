// Portraits, and the small round icon buttons that sit beside them.

import { Image } from "expo-image";
import {
  Pressable,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, radius as radii } from "@/theme";

import { Icon, type IconName } from "./Icon";

export interface AvatarProps {
  source: ImageSourcePropType;
  size: number;
  /** "rounded" is the squircle used in lists; "circle" is used in threads. */
  shape?: "rounded" | "circle";
  /** Corner radius override for the rounded shape. */
  cornerRadius?: number;
  /** Green/grey presence dot, bottom-right. */
  presence?: "online" | "offline";
  style?: StyleProp<ViewStyle>;
}

export function Avatar({
  source,
  size,
  shape = "rounded",
  cornerRadius,
  presence,
  style,
}: AvatarProps) {
  const corner = shape === "circle" ? radii.full : (cornerRadius ?? Math.round(size * 0.24));
  const dot = size >= 46 ? 13 : 11;

  return (
    <View style={[{ width: size, height: size }, styles.wrap, style]}>
      <Image
        source={source}
        style={[styles.image, { borderRadius: corner }]}
        contentFit="cover"
        transition={120}
      />
      {presence ? (
        <View
          style={[
            styles.presence,
            {
              width: dot,
              height: dot,
              borderRadius: radii.full,
              backgroundColor: presence === "online" ? colors.online : colors.offline,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

export interface IconButtonProps {
  icon: IconName;
  onPress?: () => void;
  label: string;
  size?: number;
  iconSize?: number;
  color?: string;
  fill?: string;
  /** "outline" on white, "glass" over photography, "plain" for bare arrows. */
  variant?: "outline" | "glass" | "dark" | "plain";
  /** Shows the unread dot in the top-right, as on the home bell. */
  badged?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function IconButton({
  icon,
  onPress,
  label,
  size = 44,
  iconSize = 19,
  color,
  fill,
  variant = "outline",
  badged = false,
  style,
}: IconButtonProps) {
  const skins = {
    outline: { bg: colors.white, border: colors.border, fg: colors.ink },
    glass: { bg: colors.onDarkButton, border: "transparent", fg: colors.white },
    dark: { bg: colors.scrimButton, border: "transparent", fg: colors.white },
    plain: { bg: "transparent", border: "transparent", fg: colors.ink },
  } as const;
  const skin = skins[variant];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={4}
      style={({ pressed }) => [
        styles.iconButton,
        {
          width: size,
          height: size,
          backgroundColor: skin.bg,
          borderColor: skin.border,
          borderWidth: variant === "outline" ? 1 : 0,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Icon name={icon} size={iconSize} color={color ?? skin.fg} fill={fill} />
      {badged ? <View style={styles.badge} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.tint,
  },
  presence: {
    position: "absolute",
    right: -1,
    bottom: -1,
    borderWidth: 2.5,
    borderColor: colors.white,
  },
  iconButton: {
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: radii.full,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.yellow,
  },
});
