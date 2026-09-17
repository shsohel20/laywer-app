// Threads, the seeded transcript and the quick replies above the composer.

import type { Chat, Message } from "@/types";

import { photos } from "./images";

export const CHATS: Chat[] = [
  {
    id: "filips",
    name: "Filips Jonrey",
    matter: "Tenancy dispute · Brooklyn",
    preview: "I have read the notice. It was served two days short.",
    time: "4:50 AM",
    photo: photos.filips,
    unread: 2,
    online: true,
    accepted: true,
    lastFromMe: false,
    presence: "Online now",
  },
  {
    id: "shamim",
    name: "Shamim Zamin",
    matter: "Bail application · urgent",
    preview: "Hearing is listed for Thursday 10am. Can you attend?",
    time: "9:50 AM",
    photo: photos.shamim,
    unread: 1,
    online: true,
    accepted: true,
    lastFromMe: false,
    presence: "Online now",
  },
  {
    id: "elina",
    name: "Elina Carusol",
    matter: "Shareholder agreement review",
    preview: "Sent the marked-up draft for your comments.",
    time: "7:50 PM",
    photo: photos.elina,
    unread: 0,
    online: false,
    accepted: true,
    lastFromMe: true,
    presence: "Last seen today at 5:43 PM",
  },
  {
    id: "james",
    name: "James Kemeron",
    matter: "Boundary survey opinion",
    preview: "Thanks, I will revert once the survey lands.",
    time: "Yesterday",
    photo: photos.james,
    unread: 3,
    online: false,
    accepted: true,
    lastFromMe: false,
    presence: "Last seen yesterday",
  },
  {
    id: "yawna",
    name: "Yawna Fercy",
    matter: "Unfair dismissal claim",
    preview: "Understood. I am not able to take this one on.",
    time: "Yesterday",
    photo: photos.yawna,
    unread: 0,
    online: false,
    accepted: false,
    lastFromMe: false,
    presence: "Last seen 2 days ago",
  },
  {
    id: "shamima",
    name: "Shamima Chowdury",
    matter: "Maintenance variation",
    preview: "Could you send last year's statements?",
    time: "Mon",
    photo: photos.shamima,
    unread: 0,
    online: false,
    accepted: true,
    lastFromMe: false,
    presence: "Last seen Monday",
  },
  {
    id: "jubair",
    name: "Jubair Ahmed",
    matter: "Consultation · divorce",
    preview: "Booked for Friday at 2pm. Confirmed.",
    time: "12:50 AM",
    photo: photos.jubair,
    unread: 0,
    online: true,
    accepted: true,
    lastFromMe: true,
    presence: "Online now",
  },
  {
    id: "tuli",
    name: "Tuli Chakma",
    matter: "Employment contract check",
    preview: "No changes needed on clause 8.",
    time: "Sun",
    photo: photos.tuli,
    unread: 0,
    online: false,
    accepted: true,
    lastFromMe: true,
    presence: "Last seen Sunday",
  },
];

export function chatById(id: string): Chat | undefined {
  return CHATS.find((chat) => chat.id === id);
}

export const CHAT_FILTERS = ["All", "Unread", "Active matters"] as const;
export type ChatFilter = (typeof CHAT_FILTERS)[number];

/**
 * The seeded transcript. Every thread opens on the same conversation in the
 * design; anything the user sends is appended on top of it at runtime.
 */
export const SEED_MESSAGES: Message[] = [
  { id: "m1", kind: "day", fromMe: false, text: "YESTERDAY" },
  {
    id: "m2",
    kind: "system",
    fromMe: false,
    text: "Request accepted. This thread is covered by client confidentiality.",
  },
  {
    id: "m3",
    kind: "text",
    fromMe: true,
    text: "Thanks for taking this on. My landlord served a notice to quit last Friday and I have 14 days to respond.",
    time: "9:12 AM",
    read: true,
  },
  {
    id: "m4",
    kind: "text",
    fromMe: false,
    text: "Send me the notice and your tenancy agreement and I will check the service dates first. Those are usually where these fail.",
    time: "9:31 AM",
  },
  {
    id: "m5",
    kind: "doc",
    fromMe: true,
    text: "Notice to quit.pdf",
    docMeta: "2 pages · 418 KB",
    time: "9:40 AM",
    read: true,
  },
  { id: "m6", kind: "day", fromMe: false, text: "TODAY" },
  {
    id: "m7",
    kind: "text",
    fromMe: false,
    text: "I have read the notice. It was served two days short of the statutory period, which makes it defective. We can reply on that basis.",
    time: "4:50 AM",
  },
  {
    id: "m8",
    kind: "doc",
    fromMe: false,
    text: "Draft response letter.docx",
    docMeta: "1 page · 96 KB",
    time: "4:52 AM",
  },
  {
    id: "m9",
    kind: "text",
    fromMe: true,
    text: "That is a relief. Do I need to attend anything in person?",
    time: "5:25 AM",
    read: false,
  },
];

export const QUICK_REPLIES = [
  "Sounds good",
  "Can we call?",
  "Sending documents",
  "What does this cost?",
];
