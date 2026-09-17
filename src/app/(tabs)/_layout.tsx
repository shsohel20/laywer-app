// The tab navigator.
//
// All seven destinations are registered; AppTabBar renders the five that belong
// to the active role. Keeping both roles' tabs in one navigator means switching
// role is a state change rather than a remount of the whole navigation tree.

import { Redirect, Tabs } from "expo-router";

import { AppTabBar } from "@/components/law/TabBar";
import { useSession } from "@/state/app-state";

export default function TabsLayout() {
  const { signedIn } = useSession();

  if (!signedIn) return <Redirect href="/onboarding" />;

  return (
    <Tabs
      tabBar={() => <AppTabBar />}
      screenOptions={{ headerShown: false, animation: "shift" }}
    >
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="lawyers" />
      <Tabs.Screen name="posts" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="account" />
      <Tabs.Screen name="practice" />
      <Tabs.Screen name="inbox" />
    </Tabs>
  );
}
