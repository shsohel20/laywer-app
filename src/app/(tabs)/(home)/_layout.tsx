// The Home tab. Notifications push on top of it and keep the tab bar visible,
// which is why alerts lives here rather than in the root stack.

import { Stack } from "expo-router";

export default function HomeStack() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
