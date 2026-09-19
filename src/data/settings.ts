// Account screen contents, per role, plus the smaller reference lists used by
// the notification, password, help and share screens.
//
// The design draws each settings row with a typographic mark (◱ ✎ ⚿ …) in a
// tinted square. Those glyphs are not in Be Vietnam Pro and would fall back to
// tofu on Android, so each maps to the equivalent icon from our own set.

import type { NotificationGroup, SettingsGroup } from "@/types";

export const CLIENT_SETTINGS: SettingsGroup[] = [
  {
    title: "My activity",
    rows: [
      {
        id: "requests",
        icon: "doc",
        label: "My requests",
        hint: "Sent, accepted and declined",
        value: "12",
        href: "/requests",
      },
      {
        id: "notes",
        icon: "edit",
        label: "Case notes",
        hint: "Documents shared with lawyers",
        value: "5",
      },
      {
        id: "saved",
        icon: "star",
        label: "Saved lawyers",
        hint: "Shortlist for later",
        value: "4",
        href: "/saved",
      },
    ],
  },
  {
    title: "Preferences",
    rows: [
      {
        id: "location",
        icon: "map-pin",
        label: "Location",
        hint: "Used to rank nearby lawyers",
        value: "Newyork",
      },
      {
        id: "areas",
        icon: "sliders",
        label: "Practice areas",
        hint: "What your feed prioritises",
        value: "3",
        href: "/practice-areas",
      },
      {
        id: "notifications",
        icon: "bell",
        label: "Notifications",
        hint: "Replies, requests and new posts",
        value: "On",
        href: "/notification-settings",
      },
    ],
  },
  {
    title: "Privacy & security",
    rows: [
      {
        id: "verification",
        icon: "check",
        label: "Identity verification",
        hint: "Confirm who you are before requesting",
        href: "/verification",
      },
      {
        id: "password",
        icon: "lock",
        label: "Password",
        hint: "Last changed 4 months ago",
        href: "/password",
      },
      {
        id: "blocked",
        icon: "ban",
        label: "Blocked accounts",
        hint: "Hidden from your feed",
        value: "0",
      },
      {
        id: "data",
        icon: "download",
        label: "Data & downloads",
        hint: "Export or delete your account",
      },
    ],
  },
  {
    title: "Support",
    rows: [
      {
        id: "help",
        icon: "help",
        label: "Help centre",
        hint: "Guides and common questions",
        href: "/help",
      },
      {
        id: "contact",
        icon: "mail",
        label: "Contact us",
        hint: "Replies within one business day",
        href: "/help",
      },
      {
        id: "terms",
        icon: "doc",
        label: "Terms & privacy",
        hint: "Legal notices and disclosures",
      },
    ],
  },
];

export const LAWYER_SETTINGS: SettingsGroup[] = [
  {
    title: "My practice",
    rows: [
      {
        id: "inbox",
        icon: "doc",
        label: "Incoming requests",
        hint: "Accept, decline or ask first",
        value: "3",
        href: "/inbox",
      },
      {
        id: "public-profile",
        icon: "nav-account",
        label: "My public profile",
        hint: "What clients see before requesting",
        href: "/law/profile",
      },
      {
        id: "availability",
        icon: "clock",
        label: "Availability & fees",
        hint: "Hours, rates and reply target",
        href: "/law/availability",
      },
      {
        id: "verification",
        icon: "check",
        label: "Verification",
        hint: "ID and practising credentials",
        href: "/verification",
      },
    ],
  },
  {
    title: "Money",
    rows: [
      {
        id: "subscription",
        icon: "star",
        label: "Subscription",
        // The trailing value is filled in by the Account screen from live
        // state, since the plan can change without an app restart.
        hint: "Plan, usage and billing",
        href: "/law/subscription",
      },
      {
        id: "earnings",
        icon: "card",
        label: "Earnings & payouts",
        hint: "Balance, escrow and payout history",
        value: "$4,280",
        href: "/law/earnings",
      },
      { id: "invoices", icon: "doc", label: "Invoices", hint: "Issued to clients per matter" },
      { id: "tax", icon: "doc", label: "Tax documents", hint: "Annual summaries for filing" },
    ],
  },
  {
    title: "Content",
    rows: [
      {
        id: "write",
        icon: "edit",
        label: "Write a post",
        hint: "Publish to the public feed",
        href: "/law/write-post",
      },
      {
        id: "my-posts",
        icon: "nav-posts",
        label: "My posts",
        hint: "Published and drafts",
        value: "9",
        href: "/posts",
      },
    ],
  },
  {
    title: "Account",
    rows: [
      {
        id: "password",
        icon: "lock",
        label: "Password",
        hint: "Last changed 4 months ago",
        href: "/password",
      },
      {
        id: "notifications",
        icon: "bell",
        label: "Notifications",
        hint: "Requests, messages and payouts",
        value: "On",
        href: "/notification-settings",
      },
      {
        id: "help",
        icon: "help",
        label: "Help centre",
        hint: "Guides for practitioners",
        href: "/help",
      },
    ],
  },
];

export const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    title: "Lawyers",
    rows: [
      { key: "replies", label: "Replies to my requests", hint: "When a lawyer accepts or declines" },
      { key: "messages", label: "New messages", hint: "Every message in an open thread" },
      { key: "reminders", label: "Consultation reminders", hint: "One hour before a booked call" },
    ],
  },
  {
    title: "Content",
    rows: [
      { key: "posts", label: "New law posts", hint: "In your chosen practice areas" },
      { key: "digest", label: "Weekly digest", hint: "Monday summary of what changed" },
      { key: "product", label: "Product news", hint: "Occasional updates about Lawey" },
    ],
  },
];

export const HELP_TOPICS = [
  "How do I send a request to a lawyer?",
  "What happens after a lawyer accepts?",
  "How are consultation fees charged?",
  "Can I withdraw a request I have sent?",
  "How do I report a lawyer or a post?",
  "How is my personal data handled?",
];

export interface ShareTarget {
  id: string;
  label: string;
  mark: string;
  tinted: boolean;
}

export const SHARE_TARGETS: ShareTarget[] = [
  { id: "linkedin", label: "LinkedIn", mark: "in", tinted: true },
  { id: "mail", label: "Mail", mark: "@", tinted: false },
  { id: "facebook", label: "Facebook", mark: "f", tinted: true },
  { id: "messenger", label: "Messenger", mark: "m", tinted: false },
  { id: "copy", label: "Copy link", mark: "⧉", tinted: true },
  { id: "print", label: "Print", mark: "⎙", tinted: false },
];
