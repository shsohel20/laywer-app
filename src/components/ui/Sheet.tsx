// The bottom sheet used for filters, sharing and requesting a consultation.
//
// Built on react-native's Modal so it sits above the tab bar and takes the
// hardware back button on Android for free.

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, layout, radius, spacing, type } from "@/theme";

import { Icon } from "./Icon";

export interface SheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Pinned action row below the scrolling body. */
  footer?: React.ReactNode;
  /** Fraction of the screen the sheet may grow to. */
  maxHeight?: `${number}%`;
  /** Sheets whose body is short enough not to need its own scroll view. */
  scroll?: boolean;
  bodyStyle?: StyleProp<ViewStyle>;
}

export function Sheet({
  visible,
  onClose,
  title,
  children,
  footer,
  maxHeight = "86%",
  scroll = true,
  bodyStyle,
}: SheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <Pressable
          style={styles.scrim}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
        />
        <View style={[styles.sheet, { maxHeight }]}>
          {title ? (
            <View style={styles.head}>
              <Text style={styles.title}>{title}</Text>
              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close"
                hitSlop={6}
                style={({ pressed }) => [styles.close, pressed && { opacity: 0.6 }]}
              >
                <Icon name="close" size={20} color={colors.textMuted} />
              </Pressable>
            </View>
          ) : null}

          {scroll ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={styles.body}
              contentContainerStyle={[styles.bodyContent, bodyStyle]}
            >
              {children}
            </ScrollView>
          ) : (
            <View style={[styles.bodyContent, bodyStyle]}>{children}</View>
          )}

          {footer ? (
            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.xl) }]}>
              {footer}
            </View>
          ) : (
            <View style={{ height: Math.max(insets.bottom, spacing.xl) }} />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.scrim,
  },
  sheet: {
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...type.pageTitle,
    fontSize: 20.6,
  },
  close: {
    width: layout.touchTarget,
    height: layout.touchTarget,
    marginRight: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flexGrow: 0,
  },
  bodyContent: {
    paddingHorizontal: layout.gutter,
  },
  footer: {
    flexDirection: "row",
    gap: spacing.sm + 2,
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.cream,
  },
});
