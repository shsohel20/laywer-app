// Domain types for the Lawey app.
//
// These describe the sample content in src/data. Everything is client-side for
// now; when a backend arrives these become the response types of the API layer
// and the screens should not have to change.

import type { Href } from "expo-router";
import type { ImageSourcePropType } from "react-native";

import type { IconName } from "@/components/ui/Icon";

/**
 * The app ships both sides of the marketplace. The active role decides which
 * tab bar, account screen and alert feed the user sees.
 */
export type Role = "customer" | "lawyer";

export type AreaId =
  | "family"
  | "business"
  | "criminal"
  | "property"
  | "labour"
  | "immigration"
  | "tax"
  | "human-rights";

export interface PracticeArea {
  id: AreaId;
  name: string;
  /** Rendered as "184 lawyers" under the name. */
  lawyerCount: number;
  icon: IconName;
  /** Only the first five are shown as tiles on the home screen. */
  featured: boolean;
}

export interface Lawyer {
  id: string;
  name: string;
  /** Headline specialism, e.g. "Family Lawyer". */
  specialism: string;
  area: AreaId;
  location: string;
  rating: number;
  /** Pre-formatted because it is a display-only figure, e.g. "1,201". */
  reviewCount: string;
  photo: ImageSourcePropType;
  /** Alternate portrait used in the Popular rail. */
  altPhoto?: ImageSourcePropType;
  email: string;
  /** One-line summary shown on the lawyers list. */
  blurb: string;
  /** Longer paragraph shown on the profile. */
  about: string;
  years: string;
  matters: string;
  admitted: string;
  /** Free-text practice areas — finer grained than AreaId. */
  areas: string[];
  school: string;
  bar: string;
  languages: string;
  fee: string;
  hourly: string;
  chambers: string;
  /** Median reply time, e.g. "2h". */
  replyTime: string;
}

export interface Review {
  id: string;
  name: string;
  date: string;
  /** 1–5, rendered as filled stars. */
  rating: number;
  matter: string;
  text: string;
}

export interface Post {
  id: string;
  title: string;
  /** Free-text category label, e.g. "International". */
  category: string;
  cover: ImageSourcePropType;
  author: string;
  authorPhoto: ImageSourcePropType;
  date: string;
  body: string;
  body2: string;
}

export interface Chat {
  id: string;
  name: string;
  matter: string;
  /** Preview of the most recent message. */
  preview: string;
  time: string;
  photo: ImageSourcePropType;
  unread: number;
  online: boolean;
  /** False once a lawyer has declined the underlying request. */
  accepted: boolean;
  /** True when the last message was sent by the current user. */
  lastFromMe: boolean;
  presence: string;
}

export type MessageKind = "day" | "system" | "text" | "doc";

export interface Message {
  id: string;
  kind: MessageKind;
  /** Day separators and system notices belong to neither side. */
  fromMe: boolean;
  text: string;
  time?: string;
  /** e.g. "2 pages · 418 KB". */
  docMeta?: string;
  /** Drives the single/double tick on outgoing messages. */
  read?: boolean;
}

export type RequestStatus = "accepted" | "pending" | "declined";

/** A consultation request as the client sees it. */
export interface ClientRequest {
  id: string;
  lawyerId: string;
  name: string;
  matter: string;
  status: RequestStatus;
  date: string;
  photo: ImageSourcePropType;
}

export type InboxStatus = "new" | "accepted" | "declined";

/** The same request as the lawyer sees it, with the client's brief attached. */
export interface InboxRequest {
  id: string;
  name: string;
  /** e.g. "New client · Newyork, USA". */
  meta: string;
  area: string;
  photo: ImageSourcePropType;
  summary: string;
  urgency: string;
  location: string;
  /** Empty when nothing was attached. */
  docs: string;
  /** How long it has been waiting, e.g. "18 min". */
  age: string;
  status: InboxStatus;
}

export interface Alert {
  id: string;
  text: string;
  time: string;
  /** Absent for platform notices, which show the Lawey mark instead. */
  photo?: ImageSourcePropType;
  unread: boolean;
}

export interface SettingsRow {
  id: string;
  icon: IconName;
  label: string;
  hint: string;
  /** Trailing value, e.g. "12" or "On". */
  value?: string;
  /** Rows without a destination are inert placeholders in the design. */
  href?: Href;
}

export interface SettingsGroup {
  title: string;
  rows: SettingsRow[];
}

export type ScheduleKind = "CALL" | "DUE" | "TASK";

export interface ScheduleEntry {
  id: string;
  time: string;
  meridiem: string;
  title: string;
  detail: string;
  kind: ScheduleKind;
}

/**
 * How far an identity check has got. Both sides of the marketplace go through
 * the same three states — only the documents asked for differ.
 */
export type VerifyStatus = "unverified" | "pending" | "verified";

/**
 * A single document's state, derived from whether it has been added and how far
 * the submission around it has got. Nothing stores this.
 */
export type VerifyDocStatus = "NEEDED" | "ADDED" | "CHECKING" | "VERIFIED";

/** One item on a role's identity checklist. */
export interface VerifyDoc {
  id: string;
  label: string;
  /** What is being asked for. Shown until the document has been added. */
  requirement: string;
  /** How the added file reads back: name, size, and what was read off it. */
  file: string;
}

export interface Transaction {
  id: string;
  label: string;
  meta: string;
  /** Signed and pre-formatted, e.g. "+$120" or "−$3,200". */
  amount: string;
}

export interface DayHours {
  id: string;
  short: string;
  hours: string;
}

export interface OnboardingSlide {
  image: ImageSourcePropType;
  title: string;
  body: string;
}

export interface NotificationToggle {
  key: string;
  label: string;
  hint: string;
}

export interface NotificationGroup {
  title: string;
  rows: NotificationToggle[];
}

export type PlanId = "free" | "professional" | "firm";

export type BillingCycle = "monthly" | "yearly";

export interface Plan {
  id: PlanId;
  name: string;
  /** Whole currency units, per month. Yearly is billed at 10x this. */
  monthlyPrice: number;
  tagline: string;
  features: string[];
  /** Requests a lawyer may accept per month. null means unlimited. */
  requestLimit: number | null;
  /** Posts a lawyer may publish per month. null means unlimited. */
  postLimit: number | null;
  /** The tier the plan screen leads with. */
  recommended: boolean;
}

export type ChargeStatus = "PAID" | "DUE" | "FAILED";

export interface Charge {
  id: string;
  label: string;
  date: string;
  amount: string;
  status: ChargeStatus;
}
