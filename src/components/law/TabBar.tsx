// Tab bar — the expanding pill.
//
// An ink bar of bare icons where the active tab expands into a yellow pill
// carrying its label. Only one label is on screen at a time, so the pill is as
// wide as its own text and the rest of the row redistributes around it.
//
// That reflow IS the state change, which is why there is no separate indicator
// and why the animation is a layout transition rather than a moving element:
// the pill has no fixed width to slide to, so its size has to come from the
// label. Laying it out and letting Reanimated interpolate the result keeps the
// two in step without measuring text by hand.

import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeIn, LinearTransition, useReducedMotion } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/ui";
import { useBadges, useSession } from "@/state/app-state";
import { colors, fonts, layout, radius, spacing } from "@/theme";

import { isTabActive, tabsForRole, type TabDef } from "./tabs";

/** Height of the live row, above the safe-area inset. */
const ROW_HEIGHT = layout.touchTarget;
/** Width of a tab showing only its icon. */
const ICON_SLOT_WIDTH = 48;

/**
 * Settled but not sluggish: no overshoot past the new width, ~280ms to rest.
 */
const TRANSITION = LinearTransition.springify().damping(18).stiffness(190).mass(0.7);

export function AppTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { role } = useSession();
  const { unreadChatCount, newRequestCount } = useBadges();
  const reducedMotion = useReducedMotion();

  const tabs = tabsForRole(role);

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.row}>
        {tabs.map((tab) => (
          <TabSlot
            key={tab.key}
            tab={tab}
            active={isTabActive(tab, pathname)}
            badgeCount={badgeCountFor(tab, unreadChatCount, newRequestCount)}
            reducedMotion={reducedMotion}
          />
        ))}
      </View>
    </View>
  );
}

function badgeCountFor(tab: TabDef, unreadChatCount: number, newRequestCount: number): number {
  if (tab.badge === "messages") return unreadChatCount;
  if (tab.badge === "requests") return newRequestCount;
  return 0;
}

interface TabSlotProps {
  tab: TabDef;
  active: boolean;
  badgeCount: number;
  reducedMotion: boolean;
}

function TabSlot({ tab, active, badgeCount, reducedMotion }: TabSlotProps) {
  // A resting tab is icon-only, so its name has to reach a screen reader some
  // other way. The unread count goes in the same label rather than a separate
  // announcement, which would read as a second control.
  const accessibilityLabel =
    badgeCount > 0 ? `${tab.label}, ${badgeCount} unread` : tab.label;

  return (
    <Animated.View layout={reducedMotion ? undefined : TRANSITION}>
      <Pressable
        onPress={() => {
          // `navigate` returns to a tab's existing screen rather than pushing a
          // second copy of it.
          if (!active) router.navigate(tab.href);
        }}
        accessibilityRole="tab"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ selected: active }}
        style={({ pressed }) => [
          styles.slot,
          active ? styles.slotActive : styles.slotResting,
          pressed && !active && styles.pressed,
        ]}
      >
        <View>
          <Icon
            name={tab.icon}
            // The scales icon reads a shade smaller than the rest of the set.
            size={tab.key === "practice" ? 23 : 22}
            color={active ? colors.ink : colors.onDarkMuted}
            strokeWidth={1.9}
          />
          {badgeCount > 0 ? (
            <View style={[styles.dot, active ? styles.dotOnPill : styles.dotOnBar]} />
          ) : null}
        </View>
        {active ? (
          <Animated.Text
            entering={reducedMotion ? undefined : FadeIn.duration(140)}
            style={styles.label}
            numberOfLines={1}
          >
            {tab.label}
          </Animated.Text>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.ink,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: ROW_HEIGHT,
  },
  slot: {
    height: ROW_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slotResting: {
    width: ICON_SLOT_WIDTH,
  },
  slotActive: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    backgroundColor: colors.yellow,
  },
  pressed: {
    opacity: 0.55,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.ink,
  },
  dot: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: radius.full,
    borderWidth: 2,
  },
  /** On the ink bar the ring matches the bar, so the yellow reads as a dot. */
  dotOnBar: {
    backgroundColor: colors.yellow,
    borderColor: colors.ink,
  },
  /** On the yellow pill a yellow dot would vanish, so the pair inverts. */
  dotOnPill: {
    backgroundColor: colors.ink,
    borderColor: colors.yellow,
  },
});
