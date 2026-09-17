// Every bundled photograph, in one place.
//
// Sources live in design/Law App Mobile Redesign/assets and were re-encoded to
// JPEG at the sizes the screens actually render (9.3 MB of PNG -> 1.1 MB).
// Metro needs a literal path in require(), so this map is the one file that
// has to change when artwork does.

export const photos = {
  // Lawyers
  elina: require("@/assets/images/law/l-elina.jpg"),
  james: require("@/assets/images/law/l-james.jpg"),
  filips: require("@/assets/images/law/l-filips.jpg"),
  filipsAlt: require("@/assets/images/law/l-filips2.jpg"),
  yawna: require("@/assets/images/law/l-yawna.jpg"),
  shamim: require("@/assets/images/law/l-shamim.jpg"),

  // Clients
  julia: require("@/assets/images/law/c-julia.jpg"),
  shah: require("@/assets/images/law/c-shah.jpg"),
  milon: require("@/assets/images/law/c-milon.jpg"),
  royal: require("@/assets/images/law/c-royal.jpg"),
  sajib: require("@/assets/images/law/c-sajib.jpg"),
  shamima: require("@/assets/images/law/c-shamima.jpg"),
  jubair: require("@/assets/images/law/c-jubair.jpg"),
  tuli: require("@/assets/images/law/c-tuli.jpg"),

  // Post covers
  postIcj: require("@/assets/images/law/post-icj.jpg"),
  post144: require("@/assets/images/law/post-144.jpg"),
  postData: require("@/assets/images/law/post-data.jpg"),
  postLoans: require("@/assets/images/law/post-loans.jpg"),
  postClimate: require("@/assets/images/law/post-f.jpg"),
  postCopyright: require("@/assets/images/law/post-g.jpg"),

  // Onboarding
  onboardingFind: require("@/assets/images/law/ob-collage.jpg"),
  onboardingTalk: require("@/assets/images/law/ob-b.jpg"),
  onboardingRead: require("@/assets/images/law/ob-d.jpg"),
} as const;
