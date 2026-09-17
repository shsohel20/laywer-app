// Root layout: fonts, app state, and the stack that sits above the tab bar.
//
// Anything registered here covers the tab bar when pushed — a lawyer profile, a
// thread, and every settings screen. Routes that keep the tab bar visible live
// inside (tabs) instead.

import { BeVietnamPro_400Regular } from "@expo-google-fonts/be-vietnam-pro/400Regular";
import { BeVietnamPro_500Medium } from "@expo-google-fonts/be-vietnam-pro/500Medium";
import { BeVietnamPro_600SemiBold } from "@expo-google-fonts/be-vietnam-pro/600SemiBold";
import { BeVietnamPro_700Bold } from "@expo-google-fonts/be-vietnam-pro/700Bold";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { AppStateProvider } from "@/state/app-state";
import { colors } from "@/theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Be Vietnam Pro carries the whole type scale, so nothing should render
  // before it lands — a flash of the system font reflows every screen.
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_500Medium,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AppStateProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppStateProvider>
  );
}
