// The tab destinations, shared by every tab-bar design.
//
// Two lists, one per role — a client browses lawyers and a lawyer triages
// requests, so the destinations differ even where the slot does not. Only
// Posts and Account are common to both. One list per role rather than two
// components, because the bar that renders them is identical.
//
// The lists no longer sit in matching slots: the client's Home leads, while
// the lawyer's equivalent landing screen (Practice) is still third.

import type { Href } from "expo-router";

import type { IconName } from "@/components/ui";
import type { Role } from "@/types";

export interface TabDef {
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
  { key: "home", label: "Home", icon: "nav-home", href: "/", alsoMatches: ["/alerts"] },
  { key: "lawyers", label: "Lawyers", icon: "nav-lawyers", href: "/lawyers" },
  { key: "posts", label: "Posts", icon: "nav-posts", href: "/posts", alsoMatches: ["/posts/"] },
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

export function isTabActive(tab: TabDef, pathname: string): boolean {
  const target = String(tab.href);
  if (target === "/") {
    // Home would otherwise match every route.
    return pathname === "/" || (tab.alsoMatches?.includes(pathname) ?? false);
  }
  if (pathname === target) return true;
  return tab.alsoMatches?.some((prefix) => pathname.startsWith(prefix)) ?? false;
}

/** The active slot, or 0 when the route belongs to none of the tabs. */
export function activeTabIndex(tabs: TabDef[], pathname: string): number {
  const index = tabs.findIndex((tab) => isTabActive(tab, pathname));
  return index === -1 ? 0 : index;
}
