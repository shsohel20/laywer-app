// The ink tab bar.
//
// Two different bars, one per role — a client browses lawyers and a lawyer
// triages requests, so the first and third slots differ. Everything else is
// shared, which is why this is one component with a per-role tab list rather
// than two.

import { router, usePathname, type Href } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon, type IconName } from "@/components/ui";
import { useBadges, useSession } from "@/state/app-state";
import { colors, layout, radius, type } from "@/theme";
import type { Role } from "@/types";

interface TabDef {
  key: string;
  label: string;
  icon: IconName;
  href: Href;
  /** Routes that also light this tab, e.g. a post detail under Posts. */
  alsoMatches?: string[];
  /** Which unread counter, if any, puts a dot on this tab. */
  badge?: "messages" | "requests";
}

const CLIENT_TABS: TabDef[] = [
  { key: "lawyers", label: "Lawyers", icon: "nav-lawyers", href: "/lawyers" },
  { key: "posts", label: "Posts", icon: "nav-posts", href: "/posts", alsoMatches: ["/posts/"] },
  { key: "home", label: "Home", icon: "nav-home", href: "/", alsoMatches: ["/alerts"] },
  { key: "messages", label: "Messages", icon: "chat", href: "/messages", badge: "messages" },
  { key: "account", label: "Account", icon: "nav-account", href: "/account" },
];

const LAWYER_TABS: TabDef[] = [
  { key: "inbox", label: "Requests", icon: "bookmark", href: "/inbox", badge: "requests" },
  { key: "posts", label: "Posts", icon: "nav-posts", href: "/posts", alsoMatches: ["/posts/"] },
  {
    key: "practice",
    label: "Practice",
    icon: "nav-practice",
    href: "/practice",
    alsoMatches: ["/alerts"],
  },
  { key: "messages", label: "Clients", icon: "chat", href: "/messages", badge: "messages" },
  { key: "account", label: "Account", icon: "nav-account", href: "/account" },
];

export function tabsForRole(role: Role): TabDef[] {
  return role === "lawyer" ? LAWYER_TABS : CLIENT_TABS;
}

function isActive(tab: TabDef, pathname: string): boolean {
  const target = String(tab.href);
  if (target === "/") {
    // Home would otherwise match every route.
    return pathname === "/" || (tab.alsoMatches?.includes(pathname) ?? false);
  }
  if (pathname === target) return true;
  return tab.alsoMatches?.some((prefix) => pathname.startsWith(prefix)) ?? false;
}

export function AppTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { role } = useSession();
  const { unreadChatCount, newRequestCount } = useBadges();

  const tabs = tabsForRole(role);

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      {tabs.map((tab) => {
        const active = isActive(tab, pathname);
        const tint = active ? colors.yellow : colors.white;
        const showDot =
          (tab.badge === "messages" && unreadChatCount > 0) ||
          (tab.badge === "requests" && newRequestCount > 0);

        return (
          <Pressable
            key={tab.key}
            onPress={() => {
              // `navigate` returns to a tab's existing screen rather than
              // pushing a second copy of it.
              if (!active) router.navigate(tab.href);
            }}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: active }}
            style={styles.tab}
          >
            <View>
              <Icon
                name={tab.icon}
                size={tab.key === "practice" ? 23 : 22}
                color={tint}
                strokeWidth={1.9}
              />
              {showDot ? <View style={styles.dot} /> : null}
            </View>
            <Text style={[styles.label, { color: tint }]} numberOfLines={1}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: layout.tabBarHeight,
    paddingHorizontal: 6,
    backgroundColor: colors.ink,
  },
  tab: {
    flex: 1,
    height: layout.tabBarHeight,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  label: {
    ...type.micro,
    letterSpacing: 0.11,
  },
  dot: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.ink,
    backgroundColor: colors.yellow,
  },
});
