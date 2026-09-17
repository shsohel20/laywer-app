# Lawey — mobile app

An Expo (SDK 56) app for finding and instructing a lawyer. It ships both sides of
the marketplace: a **client** browses lawyers, sends consultation requests and
reads law posts; a **lawyer** triages incoming requests, manages availability and
publishes. The active role decides which tab bar, account screen and alert feed
you see — switch between them from **Account → View the app as**.

## Run it

```bash
npm install
npm start          # then press i / a, or scan the QR code with Expo Go
```

Other useful scripts:

```bash
npm run android    # build and run on a connected device or emulator
npm run ios
npm run web
npm run lint
npx tsc --noEmit   # type check, including route strings
```

## Where things live

```
src/
├── app/                    file-based routes (expo-router)
│   ├── (auth)/             onboarding, login, signup
│   ├── (tabs)/             the seven tab destinations
│   │   ├── (home)/         home + notifications
│   │   └── posts/          feed + post detail
│   ├── lawyer/[id].tsx     public lawyer profile
│   ├── chat/[id].tsx       a conversation
│   ├── law/                lawyer-side settings screens
│   └── *.tsx               client-side settings screens
├── components/
│   ├── ui/                 design-system primitives
│   └── law/                feature components
├── data/                   sample content (stands in for the API)
├── state/app-state.tsx     client-side application state
├── theme/                  colours, type scale, spacing
└── types/                  shared domain types
```

Screens that keep the tab bar visible live inside `(tabs)`; screens that cover it
(a profile, a thread, any settings page) are registered in the root stack.

## Design

The source of truth is [`design/Law App Mobile Redesign`](design/) — an
interactive Claude Design prototype covering all 27 screens. The app is built to
match it: `src/theme` holds the tokens read off that file, and
`src/components/ui` holds the primitives they compose into. **Change the tokens
before changing a screen** — every screen is downstream of them.

Two deliberate departures from the prototype, both noted in the code:

- Settings rows use icons from our own set rather than the prototype's
  typographic marks (`◱ ✎ ⚿ …`), which are not in Be Vietnam Pro and would fall
  back to tofu on Android.
- Photography was re-encoded from PNG to JPEG at the sizes screens actually
  render, taking the bundled artwork from 9.3 MB to 1.1 MB.

## Not built yet

There is no backend. Authentication, the request lifecycle, messaging and posts
are all client-side: `src/data` is static content and `src/state/app-state.tsx`
holds anything the user changes during a session, which resets on reload.
Signing in accepts any input. When an API arrives, the types in `src/types` are
its response shapes and the screens should not need to change.
