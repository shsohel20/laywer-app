// Screen chrome: the safe-area frame, the back-arrow headers and the uppercase
// section rules that separate everything on a page.

import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { colors, layout, spacing, type } from "@/theme";

import { Icon } from "./Icon";

export interface ScreenProps {
  children: React.ReactNode;
  /**
   * Screens inside the tab navigator do not claim the bottom inset — the tab
   * bar already does.
   */
  edges?: readonly Edge[];
  style?: StyleProp<ViewStyle>;
}

export function Screen({ children, edges = ["top"], style }: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.screen, style]}>
      {children}
    </SafeAreaView>
  );
}

export interface ScreenScrollProps extends ScrollViewProps {
  children: React.ReactNode;
  /** Adds the standard 20px page gutter. */
  gutter?: boolean;
}

export function ScreenScroll({
  children,
  gutter = false,
  contentContainerStyle,
  ...rest
}: ScreenScrollProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...rest}
      contentContainerStyle={[
        gutter ? styles.gutter : null,
        styles.scrollContent,
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
}

/** A plain 20px-gutter block. */
export function Gutter({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.gutter, style]}>{children}</View>;
}

export interface BackHeaderProps {
  title: string;
  /** Defaults to `router.back()`. */
  onBack?: () => void;
  /** Rendered at the trailing edge — a count pill or an icon button. */
  trailing?: React.ReactNode;
  /** The design uses a smaller title on pushed settings screens. */
  size?: "lg" | "sm";
}

export function BackHeader({ title, onBack, trailing, size = "lg" }: BackHeaderProps) {
  return (
    <View style={styles.backHeader}>
      <Pressable
        onPress={onBack ?? (() => router.back())}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={6}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Icon name="arrow-left" size={21} color={colors.ink} />
      </Pressable>
      <Text style={[size === "lg" ? type.screenTitle : type.pageTitle, styles.backTitle]} numberOfLines={1}>
        {title}
      </Text>
      {trailing}
    </View>
  );
}

/**
 * Title-only header for the top-level tab screens, with an optional action.
 * Pass `flush` when the parent already applies the page gutter, as a FlatList
 * header does.
 */
export function ScreenHeader({
  title,
  trailing,
  flush = false,
}: {
  title: string;
  trailing?: React.ReactNode;
  flush?: boolean;
}) {
  return (
    <View style={[styles.screenHeader, flush && styles.flush]}>
      <Text style={type.screenTitle}>{title}</Text>
      {trailing}
    </View>
  );
}

export interface SectionProps {
  title: string;
  /** Text button on the trailing edge, e.g. "See all". */
  actionLabel?: string;
  onActionPress?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Section({ title, actionLabel, onActionPress, children, style }: SectionProps) {
  return (
    <View style={style}>
      <View style={styles.sectionHead}>
        <Text style={type.sectionLabel}>{title}</Text>
        {actionLabel ? (
          <Pressable
            onPress={onActionPress}
            accessibilityRole="button"
            hitSlop={8}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={type.link}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {children}
    </View>
  );
}

/** The standard explanatory paragraph under a page title. */
export function Lede({ children }: { children: React.ReactNode }) {
  return <Text style={styles.lede}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  gutter: {
    paddingHorizontal: layout.gutter,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  backHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: layout.touchTarget,
    height: layout.touchTarget,
    marginLeft: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  backTitle: {
    flex: 1,
    minWidth: 0,
  },
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingHorizontal: layout.gutter,
    paddingTop: 18,
    paddingBottom: spacing.md,
  },
  flush: {
    paddingHorizontal: 0,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: spacing.md - 1,
  },
  lede: {
    ...type.lede,
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.xxs,
    paddingBottom: 18,
  },
  pressed: {
    opacity: 0.6,
  },
});
