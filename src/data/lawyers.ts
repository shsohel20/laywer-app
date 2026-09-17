// Lawyer profiles and the client reviews shown on them.

import type { Lawyer, Review } from "@/types";

import { photos } from "./images";

/** Appended to every blurb on the full profile, as in the design. */
const CLOSING =
  "Handles contested matters end to end, from first consultation through hearing, and takes new instructions within 48 hours.";

export const LAWYERS: Lawyer[] = [
  {
    id: "filips",
    name: "Filips Jonrey",
    specialism: "Family Lawyer",
    area: "family",
    location: "Newyork, USA",
    rating: 4.0,
    reviewCount: "1,201",
    photo: photos.filips,
    altPhoto: photos.filipsAlt,
    email: "filipsjonrey@gmail.com",
    blurb:
      "Divorce, custody and maintenance, with a particular focus on contested child arrangements.",
    about: `Divorce, custody and maintenance, with a particular focus on contested child arrangements. ${CLOSING}`,
    years: "14",
    matters: "1,127",
    admitted: "2011",
    areas: ["Divorce", "Child arrangements", "Maintenance", "Prenuptial agreements"],
    school: "LL.B, Columbia Law School (2009)",
    bar: "New York State Bar; admitted to the Second Circuit",
    languages: "English, Spanish",
    fee: "$120",
    hourly: "$340/hr",
    chambers: "Suite 1400, 211 West 43rd Street, New York, NY 10036",
    replyTime: "2h",
  },
  {
    id: "elina",
    name: "Elina Carusol",
    specialism: "Business Lawyer",
    area: "business",
    location: "Newyork, USA",
    rating: 4.6,
    reviewCount: "864",
    photo: photos.elina,
    email: "elinacarusol@gmail.com",
    blurb:
      "Company formation, shareholder disputes and commercial contracts for owner-managed businesses.",
    about: `Company formation, shareholder disputes and commercial contracts for owner-managed businesses. ${CLOSING}`,
    years: "11",
    matters: "864",
    admitted: "2014",
    areas: ["Shareholder disputes", "M&A", "Commercial contracts", "Partnerships"],
    school: "J.D., NYU School of Law (2013)",
    bar: "New York State Bar; New Jersey State Bar",
    languages: "English, Italian",
    fee: "$150",
    hourly: "$420/hr",
    chambers: "Floor 9, 88 Pine Street, New York, NY 10005",
    replyTime: "2h",
  },
  {
    id: "shamim",
    name: "Shamim Zamin",
    specialism: "Crime Lawyer",
    area: "criminal",
    location: "Newjercy, USA",
    rating: 4.2,
    reviewCount: "1,530",
    photo: photos.shamim,
    email: "shamimzamin@gmail.com",
    blurb: "Defence work at trial and on appeal, including bail applications at short notice.",
    about: `Defence work at trial and on appeal, including bail applications at short notice. ${CLOSING}`,
    years: "18",
    matters: "1,530",
    admitted: "2007",
    areas: ["Trial defence", "Appeals", "Bail applications", "White collar"],
    school: "J.D., Rutgers Law School (2006)",
    bar: "New Jersey State Bar; New York State Bar",
    languages: "English, Bengali, Hindi",
    fee: "$90",
    hourly: "$295/hr",
    chambers: "2nd Floor, 550 Broad Street, Newark, NJ 07102",
    replyTime: "2h",
  },
  {
    id: "james",
    name: "James Kemeron",
    specialism: "Property Lawyer",
    area: "property",
    location: "Newyork, USA",
    rating: 3.9,
    reviewCount: "702",
    photo: photos.james,
    email: "jameskemeron@gmail.com",
    blurb: "Conveyancing, landlord and tenant matters, and boundary and title disputes.",
    about: `Conveyancing, landlord and tenant matters, and boundary and title disputes. ${CLOSING}`,
    years: "9",
    matters: "702",
    admitted: "2016",
    areas: ["Conveyancing", "Landlord & tenant", "Title disputes", "Zoning"],
    school: "LL.B, Fordham University (2015)",
    bar: "New York State Bar",
    languages: "English",
    fee: "$100",
    hourly: "$275/hr",
    chambers: "Suite 605, 120 Broadway, New York, NY 10271",
    replyTime: "2h",
  },
  {
    id: "yawna",
    name: "Yawna Fercy",
    specialism: "Labour Lawyer",
    area: "labour",
    location: "Newyork, USA",
    rating: 4.4,
    reviewCount: "981",
    photo: photos.yawna,
    email: "yawnafercy@gmail.com",
    blurb: "Unfair dismissal, discrimination claims and settlement negotiation for employees.",
    about: `Unfair dismissal, discrimination claims and settlement negotiation for employees. ${CLOSING}`,
    years: "13",
    matters: "981",
    admitted: "2012",
    areas: ["Unfair dismissal", "Discrimination", "Settlements", "Whistleblowing"],
    school: "J.D., Cornell Law School (2011)",
    bar: "New York State Bar; EEOC practice",
    languages: "English, French",
    fee: "$110",
    hourly: "$310/hr",
    chambers: "Suite 210, 45 Rockefeller Plaza, New York, NY 10111",
    replyTime: "2h",
  },
];

export function lawyerById(id: string): Lawyer | undefined {
  return LAWYERS.find((lawyer) => lawyer.id === id);
}

/** The signed-in lawyer, when the app is viewed in the lawyer role. */
export const ME_AS_LAWYER = LAWYERS[0];

/**
 * The Nearby and Popular rails on the home screen. The design shows the same
 * faces in a different order with a second portrait for Filips, so the rails
 * are explicit lists rather than a slice.
 */
export const NEARBY_LAWYERS = ["elina", "james", "filips", "yawna"]
  .map((id) => lawyerById(id))
  .filter((lawyer): lawyer is Lawyer => lawyer !== undefined);

export const POPULAR_LAWYERS = ["shamim", "filips", "yawna", "elina"]
  .map((id) => lawyerById(id))
  .filter((lawyer): lawyer is Lawyer => lawyer !== undefined);

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "R. Almeida",
    date: "March 2026",
    rating: 5,
    matter: "Child arrangements",
    text: "Set out the likely outcomes at the first meeting and did not overstate the case. Filings went in on time and I was told what each step would cost before it happened.",
  },
  {
    id: "r2",
    name: "T. Okonkwo",
    date: "January 2026",
    rating: 4,
    matter: "Financial settlement",
    text: "Replied within a few hours throughout. The negotiation took longer than I expected, but the position we settled on was the one I was advised to hold out for.",
  },
];
