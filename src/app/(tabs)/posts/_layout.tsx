// The Posts tab. A post opens within the tab, so the bar stays put.

import { Stack } from "expo-router";

export default function PostsStack() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
