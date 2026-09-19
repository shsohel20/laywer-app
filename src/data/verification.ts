// Identity checks, for both sides of the marketplace.
//
// A client proves they are a real person before their request reaches a lawyer;
// a lawyer proves that plus the right to practise. The checklists differ, the
// process does not — the process itself lives in useVerification (src/state).

import type { IconName } from "@/components/ui/Icon";
import type { Role, VerifyDoc, VerifyStatus } from "@/types";

/**
 * What an upload is allowed to be, stated before anyone picks a file. The
 * selfie is recorded in the app rather than uploaded, so it is not bound by it.
 */
export const VERIFY_FORMATS = "JPG, PNG or PDF · up to 10 MB each";

export const CLIENT_VERIFY_DOCS: VerifyDoc[] = [
  {
    id: "photo-id",
    label: "Government photo ID",
    requirement: "Passport, driving licence or state ID card. Photograph both sides of a card.",
    file: "ny-state-id.jpg · 3.8 MB · expires 08/2029",
  },
  {
    id: "liveness",
    label: "Liveness selfie",
    requirement: "A few seconds of video. We match it against the photograph on your ID.",
    file: "Recorded in the app · matched to photo ID",
  },
  {
    id: "proof-of-address",
    label: "Proof of address",
    requirement: "Utility bill, bank statement or signed lease, dated in the last three months.",
    file: "con-edison-feb.pdf · 184 KB · 14 Montague St, Brooklyn",
  },
];

export const LAWYER_VERIFY_DOCS: VerifyDoc[] = [
  {
    id: "photo-id",
    label: "Government photo ID",
    requirement: "Passport, driving licence or state ID card. Photograph both sides of a card.",
    file: "ny-drivers-licence.jpg · 2.4 MB · expires 09/2028",
  },
  {
    id: "good-standing",
    label: "Certificate of good standing",
    requirement:
      "Issued by the Appellate Division in the last 90 days. We confirm it with the court directly.",
    file: "good-standing-2nd-dept.pdf · 312 KB · reg. no. 4812995",
  },
  {
    id: "liability-insurance",
    label: "Professional liability insurance",
    requirement: "The declarations page of your current policy — carrier, limits and dates.",
    file: "cna-declarations-2026.pdf · 408 KB · $2m limit to 31 Dec",
  },
];

export function verifyDocsFor(role: Role): VerifyDoc[] {
  return role === "lawyer" ? LAWYER_VERIFY_DOCS : CLIENT_VERIFY_DOCS;
}

/** Short status label for the account badge, banner and settings row. */
export const VERIFY_LABELS: Record<VerifyStatus, string> = {
  unverified: "Not verified",
  pending: "In review",
  verified: "Verified",
};

/** One mark per state, so the badge, banner and screen never disagree. */
export const VERIFY_ICONS: Record<VerifyStatus, IconName> = {
  unverified: "alert",
  pending: "clock",
  verified: "check",
};

/**
 * Why each side is being asked. The stakes are different — a client is proving
 * they are real, a lawyer is proving they may practise — so the copy is too.
 */
export const VERIFY_COPY: Record<
  Role,
  { blurb: string; unverified: string; verified: string; footnote: string }
> = {
  customer: {
    blurb: "Checks are usually done within two business days.",
    unverified: "Lawyers answer requests from verified accounts first.",
    verified: "Every lawyer you contact can see this account is verified.",
    footnote: "Documents are held encrypted and are never shown to lawyers.",
  },
  lawyer: {
    blurb:
      "We confirm your standing with the Appellate Division, which usually takes two business days.",
    unverified: "Your profile stays hidden from search until this clears.",
    verified: "Your profile is live in search, with a verified badge.",
    footnote: "Documents are held encrypted and are never shown to clients.",
  },
};
