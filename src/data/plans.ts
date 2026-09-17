// Lawyer subscription plans.
//
// The subscription replaces commission entirely: on every tier, including Free,
// the lawyer keeps 100% of what a client pays them. What a plan buys is reach
// and volume, not a better cut — so the caps below are the whole product.

import type { BillingCycle, Charge, Plan } from "@/types";

/** Yearly is billed at ten months, so two are free. */
export const MONTHS_BILLED_YEARLY = 10;

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    tagline: "Take a few matters a month and see how it goes.",
    features: [
      "Accept up to 3 requests a month",
      "Publish 1 post a month",
      "Standard search ranking",
      "Keep 100% of your fees",
    ],
    requestLimit: 3,
    postLimit: 1,
    recommended: false,
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 49,
    tagline: "For a practitioner taking new instructions every week.",
    features: [
      "Unlimited requests",
      "Unlimited posts",
      "Priority in search results",
      "Profile and enquiry analytics",
      "Keep 100% of your fees",
    ],
    requestLimit: null,
    postLimit: null,
    recommended: true,
  },
  {
    id: "firm",
    name: "Firm",
    monthlyPrice: 129,
    tagline: "For chambers listing several practitioners together.",
    features: [
      "Everything in Professional",
      "Up to 5 practitioners",
      "Featured placement on Home",
      "Shared client inbox",
      "Named account manager",
    ],
    requestLimit: null,
    postLimit: null,
    recommended: false,
  },
];

export function planById(id: string): Plan {
  const match = PLANS.find((plan) => plan.id === id);
  if (!match) throw new Error(`Unknown plan: ${id}`);
  return match;
}

/** What the lawyer is billed per cycle, formatted for display. */
export function priceFor(plan: Plan, cycle: BillingCycle): string {
  if (plan.monthlyPrice === 0) return "Free";
  const amount =
    cycle === "yearly" ? plan.monthlyPrice * MONTHS_BILLED_YEARLY : plan.monthlyPrice;
  return `$${amount}`;
}

/** The "/mo" or "/yr" suffix that follows the price. */
export function periodFor(plan: Plan, cycle: BillingCycle): string {
  if (plan.monthlyPrice === 0) return "";
  return cycle === "yearly" ? "/yr" : "/mo";
}

export const PAYMENT_METHOD = {
  label: "Visa ···· 2046",
  hint: "Expires 08/28",
};

export const CHARGES: Charge[] = [
  {
    id: "ch1",
    label: "Professional · monthly",
    date: "14 Mar 2026",
    amount: "$49",
    status: "PAID",
  },
  {
    id: "ch2",
    label: "Professional · monthly",
    date: "14 Feb 2026",
    amount: "$49",
    status: "PAID",
  },
  {
    id: "ch3",
    label: "Professional · monthly",
    date: "14 Jan 2026",
    amount: "$49",
    status: "PAID",
  },
];

export const RENEWAL_DATE = "14 Apr 2026";

/** When the free tier's counters roll over. */
export const PERIOD_RESETS = "1 May";
