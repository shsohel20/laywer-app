// The public law-post feed.

import type { Post } from "@/types";

import { photos } from "./images";

export const POSTS: Post[] = [
  {
    id: "icj",
    title:
      "How South Africa is challenging Israel at the ICJ: A case of obligation to prevent genocide",
    category: "International",
    cover: photos.postIcj,
    author: "Filips Jonrey",
    authorPhoto: photos.filips,
    date: "21 January, 2024",
    body: "Most recently, South Africa has instituted proceedings in the International Court of Justice (ICJ) against Israel, accusing it of violating the Convention on the Prevention and Punishment of the Crime of Genocide, in relation to its military operations against the Hamas in the Gaza Strip.",
    body2:
      "Aside from the allegation that the actions and omissions of Israel have been genocidal in character and that they have failed to prevent genocide, South Africa has also asked for provisional measures to “protect against further violation of the rights of the Palestinian people under the Genocide Convention” and “to ensure Israel's compliance with its obligations under the Convention.”",
  },
  {
    id: "section-144",
    title: 'What is the imposition of "section 144"? Who imposes? Why imposed?',
    category: "Criminal",
    cover: photos.post144,
    author: "Nazim James",
    authorPhoto: photos.james,
    date: "21 January, 2024",
    body: "Section 144 empowers a district magistrate to issue an order in urgent cases of nuisance or apprehended danger, directing any person to abstain from a certain act.",
    body2:
      "The order is preventive rather than punitive, is limited in time, and may be challenged before the relevant court.",
  },
  {
    id: "data-localisation",
    title: "Data Localisation and Data Protection in Bangladesh: A Review",
    category: "Technology",
    cover: photos.postData,
    author: "Elina Carusol",
    authorPhoto: photos.elina,
    date: "18 January, 2024",
    body: "The draft framework requires certain categories of data to be stored on servers located inside the country, with narrow exceptions for cross-border transfer.",
    body2:
      "Reviewing the text against comparable regimes shows where compliance costs fall hardest on smaller operators.",
  },
  {
    id: "movable-property-loans",
    title: "Loans can be availed by mortgaging movable property: (Surokkhito Lenden Ain)",
    category: "Finance",
    cover: photos.postLoans,
    author: "Shamim Zamin",
    authorPhoto: photos.shamim,
    date: "14 January, 2024",
    body: "The Act recognises security interests over movable assets, allowing borrowers to pledge equipment, inventory and receivables.",
    body2:
      "Registration determines priority between competing creditors, which makes the filing date the operative fact in most disputes.",
  },
  {
    id: "climate-refugees",
    title: "Climate Refugees and Human Rights of the States with regard to them",
    category: "Human Rights",
    cover: photos.postClimate,
    author: "Yawna Fercy",
    authorPhoto: photos.yawna,
    date: "09 January, 2024",
    body: "Displacement driven by sea-level rise sits awkwardly in a refugee definition built around persecution.",
    body2:
      "State obligations are therefore argued mainly through non-refoulement and the right to life rather than refugee status itself.",
  },
  {
    id: "copyright-data",
    title: "Feasibility of Data Protection under the Copyright Act 2023: A New Approach?",
    category: "Technology",
    cover: photos.postCopyright,
    author: "Filips Jonrey",
    authorPhoto: photos.filips,
    date: "04 January, 2024",
    body: "Copyright and data protection pull in different directions: one rewards disclosure, the other restricts it.",
    body2:
      "The 2023 Act's treatment of databases offers a partial bridge, but leaves the status of derived datasets unresolved.",
  },
];

export function postById(id: string): Post | undefined {
  return POSTS.find((post) => post.id === id);
}

/** Filter chips above the feed. "All" is prepended by the screen. */
export const POST_CATEGORIES = [
  "International",
  "Criminal",
  "Technology",
  "Finance",
  "Human Rights",
];

/** Categories a lawyer can publish under. */
export const PUBLISHABLE_CATEGORIES = [
  "Family",
  "Criminal",
  "Property",
  "Business",
  "Labour",
  "International",
];

/** The two-up grid at the bottom of the home screen. */
export const HOME_POSTS = POSTS.slice(0, 2);
