// Sample content barrel.
//
// Screens import from here rather than reaching into individual files, so the
// day this is replaced by an API layer there is one import path to change.

export { photos } from "./images";
export { AREAS, FEATURED_AREAS, FILTER_AREAS, areaById } from "./areas";
export {
  LAWYERS,
  ME_AS_LAWYER,
  NEARBY_LAWYERS,
  POPULAR_LAWYERS,
  REVIEWS,
  lawyerById,
} from "./lawyers";
export {
  POSTS,
  POST_CATEGORIES,
  PUBLISHABLE_CATEGORIES,
  HOME_POSTS,
  postById,
} from "./posts";
export {
  CHATS,
  CHAT_FILTERS,
  SEED_MESSAGES,
  QUICK_REPLIES,
  chatById,
  type ChatFilter,
} from "./messaging";
export {
  CLIENT_REQUESTS,
  INBOX_REQUESTS,
  REQUEST_FILTERS,
  INBOX_FILTERS,
  URGENCY_OPTIONS,
  type RequestFilter,
  type InboxFilter,
} from "./requests";
export { CLIENT_ALERTS, LAWYER_ALERTS } from "./alerts";
export {
  CLIENT_SETTINGS,
  LAWYER_SETTINGS,
  NOTIFICATION_GROUPS,
  HELP_TOPICS,
  SHARE_TARGETS,
  type ShareTarget,
} from "./settings";
export {
  SCHEDULE,
  VERIFY_DOCS,
  TRANSACTIONS,
  WEEK,
  DEFAULT_WORKING_DAYS,
  REPLY_TARGETS,
  LAWYER_AREA_OPTIONS,
  EARNINGS,
} from "./practice";
export { ONBOARDING, CURRENT_USER } from "./account";
export {
  PLANS,
  CHARGES,
  PAYMENT_METHOD,
  RENEWAL_DATE,
  PERIOD_RESETS,
  MONTHS_BILLED_YEARLY,
  planById,
  priceFor,
  periodFor,
} from "./plans";
