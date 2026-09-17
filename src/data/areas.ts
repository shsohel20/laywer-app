// Practice areas. The first five are the home-screen category tiles; the full
// list is what the Practice areas preference screen offers.

import type { AreaId, PracticeArea } from "@/types";

export const AREAS: PracticeArea[] = [
  { id: "family", name: "Family", lawyerCount: 184, icon: "area-family", featured: true },
  { id: "business", name: "Business", lawyerCount: 96, icon: "area-business", featured: true },
  { id: "criminal", name: "Criminal", lawyerCount: 142, icon: "area-criminal", featured: true },
  { id: "property", name: "Property", lawyerCount: 77, icon: "area-property", featured: true },
  { id: "labour", name: "Labour", lawyerCount: 51, icon: "area-labour", featured: true },
  { id: "immigration", name: "Immigration", lawyerCount: 63, icon: "map-pin", featured: false },
  { id: "tax", name: "Tax", lawyerCount: 38, icon: "card", featured: false },
  { id: "human-rights", name: "Human rights", lawyerCount: 29, icon: "heart", featured: false },
];

export const FEATURED_AREAS = AREAS.filter((area) => area.featured);

export function areaById(id: AreaId): PracticeArea {
  const match = AREAS.find((area) => area.id === id);
  if (!match) throw new Error(`Unknown practice area: ${id}`);
  return match;
}

/** The six offered in the lawyer filter sheet. */
export const FILTER_AREAS = AREAS.slice(0, 6);
