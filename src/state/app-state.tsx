// Client-side application state for Lawey.
//
// There is no backend yet, so everything the user changes in a session lives
// here: which role they are viewing as, their shortlist, their preferences, the
// decisions a lawyer takes on incoming requests, and any messages they send.
//
// This is deliberately one provider rather than five. At this size the cost of
// a shared context is a few extra renders of static screens, whereas provider
// soup is a permanent readability cost. The slice hooks at the bottom are the
// public API, so if one slice ever does need its own context the screens will
// not have to change. Splitting before measuring would be guesswork.

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  CHATS,
  CLIENT_ALERTS,
  DEFAULT_WORKING_DAYS,
  INBOX_REQUESTS,
  LAWYER_ALERTS,
  SEED_MESSAGES,
  planById,
} from "@/data";
import type { AreaId, BillingCycle, InboxStatus, Message, PlanId, Role } from "@/types";

export type SortOption = "Nearby" | "Popular";

export interface LawyerFilters {
  areaIds: AreaId[];
  sort: SortOption;
  /** 0 means "any rating". */
  minRating: number;
}

const INITIAL_FILTERS: LawyerFilters = { areaIds: ["family"], sort: "Nearby", minRating: 4 };

const INITIAL_NOTIFICATIONS: Record<string, boolean> = {
  replies: true,
  messages: true,
  reminders: true,
  posts: true,
  digest: false,
  product: false,
};

/** Seeded so the Saved screen and the shortlist counter have content. */
const INITIAL_SAVED = ["filips", "elina", "james", "yawna"];

const INITIAL_AREAS: AreaId[] = ["family", "property", "labour"];

const INITIAL_MY_AREAS = ["Divorce", "Child arrangements", "Maintenance"];

interface AppStateValue {
  // — Session ——————————————————————————————————————————————
  role: Role;
  setRole: (role: Role) => void;
  signedIn: boolean;
  /**
   * Signing in carries the role, so the tab bar is never rendered for the wrong
   * side of the marketplace on the first frame after authenticating.
   */
  signIn: (role: Role) => void;
  signOut: () => void;

  // — Shortlist ————————————————————————————————————————————
  savedLawyerIds: string[];
  isSaved: (lawyerId: string) => boolean;
  toggleSaved: (lawyerId: string) => void;

  // — Client preferences ———————————————————————————————————
  areaIds: AreaId[];
  toggleArea: (areaId: AreaId) => void;
  notifications: Record<string, boolean>;
  toggleNotification: (key: string) => void;

  // — Lawyer practice settings —————————————————————————————
  myAreas: string[];
  toggleMyArea: (name: string) => void;
  acceptingClients: boolean;
  toggleAccepting: () => void;
  workingDayIds: string[];
  toggleWorkingDay: (dayId: string) => void;
  replyTarget: string;
  setReplyTarget: (target: string) => void;

  // — Lawyer inbox —————————————————————————————————————————
  inboxStatusFor: (requestId: string) => InboxStatus;
  setInboxStatus: (requestId: string, status: InboxStatus) => void;
  newRequestCount: number;

  // — Lawyer search filters ————————————————————————————————
  filters: LawyerFilters;
  toggleFilterArea: (areaId: AreaId) => void;
  clearFilterAreas: () => void;
  setSort: (sort: SortOption) => void;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;

  // — Conversations ————————————————————————————————————————
  messagesFor: (chatId: string) => Message[];
  sendMessage: (chatId: string, text: string) => void;
  unreadChatCount: number;

  // — Subscription —————————————————————————————————————————
  planId: PlanId;
  billingCycle: BillingCycle;
  setPlan: (planId: PlanId, cycle?: BillingCycle) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
  /** Requests accepted this billing period. */
  requestsUsed: number;
  /** null when the plan is unlimited. */
  requestsRemaining: number | null;
  canAcceptRequest: boolean;
  /** Posts published this billing period. */
  postsUsed: number;
  postsRemaining: number | null;
  canPublishPost: boolean;
  publishPost: () => void;

  // — Alerts ———————————————————————————————————————————————
  hasUnreadAlerts: boolean;
}

const AppStateContext = createContext<AppStateValue | null>(null);

/** Adds `value` to `list`, or removes it if already present. */
function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("customer");
  const [signedIn, setSignedIn] = useState(false);

  const [savedLawyerIds, setSavedLawyerIds] = useState<string[]>(INITIAL_SAVED);
  const [areaIds, setAreaIds] = useState<AreaId[]>(INITIAL_AREAS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const [myAreas, setMyAreas] = useState<string[]>(INITIAL_MY_AREAS);
  const [acceptingClients, setAcceptingClients] = useState(true);
  const [workingDayIds, setWorkingDayIds] = useState<string[]>(DEFAULT_WORKING_DAYS);
  const [replyTarget, setReplyTarget] = useState("2 hours");

  // Starts on Free so the caps, and the reason to leave them, are visible.
  const [planId, setPlanId] = useState<PlanId>("free");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [postsUsed, setPostsUsed] = useState(0);

  const [inboxOverrides, setInboxOverrides] = useState<Record<string, InboxStatus>>({});
  const [filters, setFilters] = useState<LawyerFilters>(INITIAL_FILTERS);
  // Only messages sent this session; the seeded transcript is prepended on read.
  const [outbox, setOutbox] = useState<Record<string, Message[]>>({});

  const isSaved = useCallback(
    (lawyerId: string) => savedLawyerIds.includes(lawyerId),
    [savedLawyerIds],
  );

  const inboxStatusFor = useCallback(
    (requestId: string): InboxStatus =>
      inboxOverrides[requestId] ??
      INBOX_REQUESTS.find((request) => request.id === requestId)?.status ??
      "new",
    [inboxOverrides],
  );

  const messagesFor = useCallback(
    (chatId: string) => [...SEED_MESSAGES, ...(outbox[chatId] ?? [])],
    [outbox],
  );

  const sendMessage = useCallback((chatId: string, text: string) => {
    const body = text.trim();
    if (!body) return;
    setOutbox((current) => ({
      ...current,
      [chatId]: [
        ...(current[chatId] ?? []),
        {
          id: `sent-${chatId}-${current[chatId]?.length ?? 0}`,
          kind: "text",
          fromMe: true,
          text: body,
          time: "Now",
          read: false,
        },
      ],
    }));
  }, []);

  const newRequestCount = useMemo(
    () => INBOX_REQUESTS.filter((request) => inboxStatusFor(request.id) === "new").length,
    [inboxStatusFor],
  );

  const unreadChatCount = useMemo(
    () => CHATS.filter((chat) => chat.unread > 0).length,
    [],
  );

  const plan = planById(planId);

  // The cap is on accepting, not receiving: a lawyer always sees what is
  // waiting, which is the whole reason to upgrade.
  const requestsUsed = useMemo(
    () => INBOX_REQUESTS.filter((request) => inboxStatusFor(request.id) === "accepted").length,
    [inboxStatusFor],
  );

  const requestsRemaining =
    plan.requestLimit === null ? null : Math.max(plan.requestLimit - requestsUsed, 0);

  const postsRemaining =
    plan.postLimit === null ? null : Math.max(plan.postLimit - postsUsed, 0);

  const hasUnreadAlerts = useMemo(
    () => (role === "lawyer" ? LAWYER_ALERTS : CLIENT_ALERTS).some((alert) => alert.unread),
    [role],
  );

  const value = useMemo<AppStateValue>(
    () => ({
      role,
      setRole: setRoleState,
      signedIn,
      signIn: (nextRole) => {
        setRoleState(nextRole);
        setSignedIn(true);
      },
      signOut: () => {
        setSignedIn(false);
        setRoleState("customer");
      },

      savedLawyerIds,
      isSaved,
      toggleSaved: (lawyerId) => setSavedLawyerIds((ids) => toggle(ids, lawyerId)),

      areaIds,
      toggleArea: (areaId) => setAreaIds((ids) => toggle(ids, areaId)),
      notifications,
      toggleNotification: (key) =>
        setNotifications((current) => ({ ...current, [key]: !current[key] })),

      myAreas,
      toggleMyArea: (name) => setMyAreas((names) => toggle(names, name)),
      acceptingClients,
      toggleAccepting: () => setAcceptingClients((on) => !on),
      workingDayIds,
      toggleWorkingDay: (dayId) => setWorkingDayIds((ids) => toggle(ids, dayId)),
      replyTarget,
      setReplyTarget,

      inboxStatusFor,
      setInboxStatus: (requestId, status) =>
        setInboxOverrides((current) => ({ ...current, [requestId]: status })),
      newRequestCount,

      filters,
      toggleFilterArea: (areaId) =>
        setFilters((current) => ({ ...current, areaIds: toggle(current.areaIds, areaId) })),
      clearFilterAreas: () => setFilters((current) => ({ ...current, areaIds: [] })),
      setSort: (sort) => setFilters((current) => ({ ...current, sort })),
      setMinRating: (minRating) => setFilters((current) => ({ ...current, minRating })),
      resetFilters: () => setFilters({ areaIds: [], sort: "Nearby", minRating: 0 }),

      messagesFor,
      sendMessage,
      unreadChatCount,

      planId,
      billingCycle,
      setPlan: (nextPlan, cycle) => {
        setPlanId(nextPlan);
        if (cycle) setBillingCycle(cycle);
      },
      setBillingCycle,
      requestsUsed,
      requestsRemaining,
      canAcceptRequest: requestsRemaining === null || requestsRemaining > 0,
      postsUsed,
      postsRemaining,
      canPublishPost: postsRemaining === null || postsRemaining > 0,
      publishPost: () => setPostsUsed((count) => count + 1),

      hasUnreadAlerts,
    }),
    [
      role,
      signedIn,
      savedLawyerIds,
      isSaved,
      areaIds,
      notifications,
      myAreas,
      acceptingClients,
      workingDayIds,
      replyTarget,
      inboxStatusFor,
      newRequestCount,
      filters,
      messagesFor,
      sendMessage,
      unreadChatCount,
      planId,
      billingCycle,
      requestsUsed,
      requestsRemaining,
      postsUsed,
      postsRemaining,
      hasUnreadAlerts,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

function useAppState(): AppStateValue {
  const value = useContext(AppStateContext);
  if (!value) throw new Error("useAppState must be used inside <AppStateProvider>");
  return value;
}

// Slice hooks. Screens should use these rather than reaching for the whole
// store, so the shape of the store stays free to change.

export function useSession() {
  const { role, setRole, signedIn, signIn, signOut } = useAppState();
  return { role, setRole, signedIn, signIn, signOut };
}

export function useSaved() {
  const { savedLawyerIds, isSaved, toggleSaved } = useAppState();
  return { savedLawyerIds, isSaved, toggleSaved };
}

export function usePreferences() {
  const { areaIds, toggleArea, notifications, toggleNotification } = useAppState();
  return { areaIds, toggleArea, notifications, toggleNotification };
}

export function usePracticeSettings() {
  const {
    myAreas,
    toggleMyArea,
    acceptingClients,
    toggleAccepting,
    workingDayIds,
    toggleWorkingDay,
    replyTarget,
    setReplyTarget,
  } = useAppState();
  return {
    myAreas,
    toggleMyArea,
    acceptingClients,
    toggleAccepting,
    workingDayIds,
    toggleWorkingDay,
    replyTarget,
    setReplyTarget,
  };
}

export function useInbox() {
  const { inboxStatusFor, setInboxStatus, newRequestCount } = useAppState();
  return { inboxStatusFor, setInboxStatus, newRequestCount };
}

export function useFilters() {
  const { filters, toggleFilterArea, clearFilterAreas, setSort, setMinRating, resetFilters } =
    useAppState();
  return { filters, toggleFilterArea, clearFilterAreas, setSort, setMinRating, resetFilters };
}

export function useConversations() {
  const { messagesFor, sendMessage, unreadChatCount } = useAppState();
  return { messagesFor, sendMessage, unreadChatCount };
}

export function useSubscription() {
  const {
    planId,
    billingCycle,
    setPlan,
    setBillingCycle,
    requestsUsed,
    requestsRemaining,
    canAcceptRequest,
    postsUsed,
    postsRemaining,
    canPublishPost,
    publishPost,
  } = useAppState();
  return {
    plan: planById(planId),
    billingCycle,
    setPlan,
    setBillingCycle,
    requestsUsed,
    requestsRemaining,
    canAcceptRequest,
    postsUsed,
    postsRemaining,
    canPublishPost,
    publishPost,
  };
}

export function useBadges() {
  const { unreadChatCount, newRequestCount, hasUnreadAlerts } = useAppState();
  return { unreadChatCount, newRequestCount, hasUnreadAlerts };
}
