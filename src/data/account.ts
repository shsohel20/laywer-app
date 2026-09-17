// The signed-in client, and the onboarding carousel.

import type { OnboardingSlide } from "@/types";

import { photos } from "./images";

export const ONBOARDING: OnboardingSlide[] = [
  {
    image: photos.onboardingFind,
    title: "Find the right lawyer, near you",
    body: "Browse verified advocates by practice area, location and rating — no cold calls.",
  },
  {
    image: photos.onboardingTalk,
    title: "Talk before you commit",
    body: "Send a request, chat directly and share your documents in one thread.",
  },
  {
    image: photos.onboardingRead,
    title: "Stay current on the law",
    body: "Plain-language posts from practising lawyers on the rules that affect you.",
  },
];

export const CURRENT_USER = {
  name: "Julia Daisy",
  email: "juliadaisy@gmail.com",
  phone: "+001-4821-9003",
  location: "Newyork, USA",
  about: "Looking for help with a tenancy dispute in Brooklyn.",
  photo: photos.julia,
};
