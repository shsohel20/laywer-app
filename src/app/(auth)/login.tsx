// Sign in.
//
// There is no auth backend yet, so "Log in" flips the session flag rather than
// validating anything. When one exists, this screen is where React Hook Form,
// Zod and expo-secure-store go; the layout should not need to change.

import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { RoleSelector } from "@/components/law/RoleSelector";
import { Button, LogoMark, Screen, ScreenScroll, TextField } from "@/components/ui";
import { useSession } from "@/state/app-state";
import { colors, layout, spacing, type } from "@/theme";
import type { Role } from "@/types";

export default function LoginScreen() {
  const { signIn } = useSession();
  // With no backend, the role is chosen here. Once accounts exist the server
  // decides it and this picker goes away.
  const [role, setRole] = useState<Role>("customer");

  const submit = () => {
    signIn(role);
    router.replace(role === "lawyer" ? "/practice" : "/");
  };

  return (
    <Screen edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenScroll contentContainerStyle={styles.content}>
          <View style={styles.intro}>
            <LogoMark size={62} />
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to reach your advocates and requests.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.roleBlock}>
              <Text style={styles.roleLabel}>Sign in as</Text>
              <RoleSelector value={role} onChange={setRole} />
            </View>

            <TextField
              label="Email / Phone"
              placeholder="filipsjonrey@gmail.com"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="username"
            />
            <TextField
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              textContentType="password"
            />
            <Pressable
              onPress={() => router.push("/forgot-password")}
              accessibilityRole="button"
              hitSlop={6}
              style={({ pressed }) => [styles.forgot, pressed && styles.pressed]}
            >
              <Text style={styles.forgotLabel}>Forgot password?</Text>
            </Pressable>
            <Button label="Log in" onPress={submit} />
          </View>

          <View style={styles.spacer} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&rsquo;t have account?</Text>
            <Pressable
              onPress={() => router.push("/signup")}
              accessibilityRole="button"
              hitSlop={8}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.footerLink}>Signup</Text>
            </Pressable>
          </View>
        </ScreenScroll>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.xxl - 2,
    paddingBottom: spacing.xxl,
  },
  intro: {
    paddingTop: 44,
  },
  title: {
    ...type.display,
    fontSize: 31,
    lineHeight: 34,
    marginTop: spacing.xxl,
  },
  subtitle: {
    ...type.body,
    color: colors.textBody,
    marginTop: spacing.sm + 2,
  },
  form: {
    gap: spacing.lg,
    paddingTop: spacing.xl + spacing.md,
  },
  roleBlock: {
    gap: spacing.sm + 2,
  },
  roleLabel: {
    ...type.fieldLabel,
  },
  forgot: {
    alignSelf: "flex-end",
    minHeight: layout.touchTarget,
    justifyContent: "center",
  },
  forgotLabel: {
    ...type.link,
    fontFamily: type.bodyMedium.fontFamily,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xl,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingTop: spacing.xl,
  },
  footerText: {
    ...type.lede,
  },
  footerLink: {
    ...type.bodySemi,
    fontSize: 14,
    color: colors.amber,
  },
  pressed: {
    opacity: 0.6,
  },
});
