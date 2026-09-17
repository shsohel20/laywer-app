// Consultation requests, from both sides of the marketplace.

import type { ClientRequest, InboxRequest } from "@/types";

import { photos } from "./images";

/** What the client sees under Account -> My requests. */
export const CLIENT_REQUESTS: ClientRequest[] = [
  {
    id: "cr1",
    lawyerId: "filips",
    name: "Filips Jonrey",
    matter: "Tenancy dispute · Brooklyn",
    status: "accepted",
    date: "Sent 12 Mar 2026",
    photo: photos.filips,
  },
  {
    id: "cr2",
    lawyerId: "elina",
    name: "Elina Carusol",
    matter: "Shareholder agreement review",
    status: "pending",
    date: "Sent 9 Mar 2026",
    photo: photos.elina,
  },
  {
    id: "cr3",
    lawyerId: "shamim",
    name: "Shamim Zamin",
    matter: "Bail application · urgent",
    status: "accepted",
    date: "Sent 2 Mar 2026",
    photo: photos.shamim,
  },
  {
    id: "cr4",
    lawyerId: "james",
    name: "James Kemeron",
    matter: "Boundary survey opinion",
    status: "pending",
    date: "Sent 27 Feb 2026",
    photo: photos.james,
  },
  {
    id: "cr5",
    lawyerId: "yawna",
    name: "Yawna Fercy",
    matter: "Unfair dismissal claim",
    status: "declined",
    date: "Sent 14 Feb 2026",
    photo: photos.yawna,
  },
];

export const REQUEST_FILTERS = ["All", "Accepted", "Pending", "Declined"] as const;
export type RequestFilter = (typeof REQUEST_FILTERS)[number];

/** What the lawyer sees in their Requests inbox. */
export const INBOX_REQUESTS: InboxRequest[] = [
  {
    id: "ir1",
    name: "Julia Daisy",
    meta: "New client · Newyork, USA",
    area: "Landlord & tenant",
    photo: photos.julia,
    summary:
      "My landlord served a notice to quit last Friday and I have 14 days to respond. I have the notice and my tenancy agreement.",
    urgency: "Needs reply in 2 days",
    location: "Brooklyn, NY",
    docs: "2 documents",
    age: "18 min",
    status: "new",
  },
  {
    id: "ir2",
    name: "Shah Mahmud Hasan",
    meta: "New client · Newyork, USA",
    area: "Child arrangements",
    photo: photos.shah,
    summary:
      "Seeking to vary an existing contact order. The other parent has moved out of state without notifying me.",
    urgency: "No deadline given",
    location: "Queens, NY",
    docs: "",
    age: "2 hours",
    status: "new",
  },
  {
    id: "ir3",
    name: "Milon Mahmud",
    meta: "Returning client · 2 past matters",
    area: "Divorce",
    photo: photos.milon,
    summary:
      "Financial disclosure has stalled. I would like you to take over from my previous solicitor.",
    urgency: "Needs reply in 5 days",
    location: "Manhattan, NY",
    docs: "4 documents",
    age: "Yesterday",
    status: "new",
  },
  {
    id: "ir4",
    name: "Royal Chakroborty",
    meta: "New client · Newjercy, USA",
    area: "Maintenance",
    photo: photos.royal,
    summary:
      "Requesting a review of a maintenance calculation I believe was worked out on the wrong income figure.",
    urgency: "No deadline given",
    location: "Newark, NJ",
    docs: "1 document",
    age: "3 days ago",
    status: "accepted",
  },
  {
    id: "ir5",
    name: "Sajib Abdullah",
    meta: "New client · Newyork, USA",
    area: "Prenuptial agreements",
    photo: photos.sajib,
    summary: "Need a prenuptial agreement drafted and reviewed before a wedding in October.",
    urgency: "No deadline given",
    location: "Bronx, NY",
    docs: "",
    age: "5 days ago",
    status: "declined",
  },
];

export const INBOX_FILTERS = ["New", "Accepted", "Declined", "All"] as const;
export type InboxFilter = (typeof INBOX_FILTERS)[number];

/** Options in the "How soon do you need help?" picker. */
export const URGENCY_OPTIONS = ["Within days", "This month", "No rush"];
