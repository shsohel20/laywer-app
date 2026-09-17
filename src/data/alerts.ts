// The notification feed. Each role sees a different one.

import type { Alert } from "@/types";

import { photos } from "./images";

export const CLIENT_ALERTS: Alert[] = [
  {
    id: "a1",
    text: "Filips Jonrey accepted your request. You can start the conversation now.",
    time: "12 min ago",
    photo: photos.filips,
    unread: true,
  },
  {
    id: "a2",
    text: "New post from Elina Carusol: Data Localisation and Data Protection in Bangladesh.",
    time: "2 hours ago",
    photo: photos.elina,
    unread: true,
  },
  {
    id: "a3",
    text: "Shamim Zamin replied to your case note.",
    time: "Yesterday",
    photo: photos.shamim,
    unread: false,
  },
  {
    id: "a4",
    text: "Your request to James Kemeron is still awaiting a response.",
    time: "2 days ago",
    photo: photos.james,
    unread: false,
  },
];

export const LAWYER_ALERTS: Alert[] = [
  {
    id: "la1",
    text: "New request from Julia Daisy — landlord & tenant, needs a reply within 2 days.",
    time: "18 min ago",
    photo: photos.julia,
    unread: true,
  },
  {
    id: "la2",
    text: "Shah Mahmud Hasan sent a new request in child arrangements.",
    time: "2 hours ago",
    photo: photos.shah,
    unread: true,
  },
  {
    // No photo: platform notices carry the Lawey mark instead of a face.
    id: "la3",
    text: "Your bar admission certificate is being checked with the licensing body.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "la4",
    text: "$120 released from escrow for the Julia Daisy consultation.",
    time: "Yesterday",
    photo: photos.julia,
    unread: false,
  },
  {
    id: "la5",
    text: "Milon Mahmud is waiting on your reply. Your target is 2 hours.",
    time: "2 days ago",
    photo: photos.milon,
    unread: false,
  },
];
