// Lawyer-side reference data: today's diary, money and hours.

import type { DayHours, ScheduleEntry, Transaction } from "@/types";

export const SCHEDULE: ScheduleEntry[] = [
  {
    id: "s1",
    time: "9:30",
    meridiem: "AM",
    title: "Consultation · Julia Daisy",
    detail: "Video call · 45 minutes",
    kind: "CALL",
  },
  {
    id: "s2",
    time: "11:00",
    meridiem: "AM",
    title: "Filing deadline · Kemeron matter",
    detail: "Response to notice due",
    kind: "DUE",
  },
  {
    id: "s3",
    time: "2:15",
    meridiem: "PM",
    title: "Consultation · Milon Mahmud",
    detail: "In chambers · 1 hour",
    kind: "CALL",
  },
  {
    id: "s4",
    time: "4:00",
    meridiem: "PM",
    title: "Review marked-up draft",
    detail: "Shareholder agreement",
    kind: "TASK",
  },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    label: "Consultation · Julia Daisy",
    meta: "14 Mar · released from escrow",
    amount: "+$120",
  },
  {
    id: "t2",
    label: "Hourly work · Kemeron matter",
    meta: "12 Mar · 3.5 hrs at $340",
    amount: "+$1,190",
  },
  { id: "t3", label: "Payout to Chase ···· 4417", meta: "10 Mar · completed", amount: "−$3,200" },
  {
    id: "t4",
    label: "Consultation · Shah Mahmud Hasan",
    meta: "8 Mar · released from escrow",
    amount: "+$120",
  },
];

export const WEEK: DayHours[] = [
  { id: "mon", short: "Mon", hours: "9:00 AM – 6:00 PM" },
  { id: "tue", short: "Tue", hours: "9:00 AM – 6:00 PM" },
  { id: "wed", short: "Wed", hours: "9:00 AM – 6:00 PM" },
  { id: "thu", short: "Thu", hours: "9:00 AM – 6:00 PM" },
  { id: "fri", short: "Fri", hours: "9:00 AM – 1:00 PM" },
  { id: "sat", short: "Sat", hours: "Not available" },
  { id: "sun", short: "Sun", hours: "Not available" },
];

/** Days that are on by default, matching the design. */
export const DEFAULT_WORKING_DAYS = ["mon", "tue", "wed", "thu", "fri"];

export const REPLY_TARGETS = ["1 hour", "2 hours", "Same day"];

/** Practice areas a family lawyer can list on their public profile. */
export const LAWYER_AREA_OPTIONS = [
  "Divorce",
  "Child arrangements",
  "Maintenance",
  "Prenuptial agreements",
  "Adoption",
  "Domestic abuse",
];

export const EARNINGS = {
  available: "$4,280",
  escrow: "$1,150",
  thisMonth: "$6,430",
  bank: "Chase ···· 4417",
  bankHint: "Payouts arrive in 2 business days",
};
