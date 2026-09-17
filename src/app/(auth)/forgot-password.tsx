// Step 1 of password recovery: say who you are.
//
// There is no backend, so nothing is actually sent — the screen advances to the
// code step regardless, which is also what a real implementation should do.
// Telling an anonymous caller whether an address exists is an account
// enumeration hole, so the response must not depend on the answer.

import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Button, Icon, Screen, ScreenScroll, TextField } from "@/components/ui";
import { colors, layout, spacing, type } from "@/theme";

export default function ForgotPasswordScreen() {
  const [contact, setContact] = useState("");
  const ready = contact.trim().length > 3;

  return (
    <Screen edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenScroll contentContainerStyle={styles.content}>
          <View style={styles.intro}>
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={6}
              style={({ pressed }) => [styles.back, pressed && styles.pressed]}
            >
              <Icon name="arrow-left" size={21} color={colors.ink} />
            </Pressable>
            <Text style={styles.title}>Forgot password</Text>
            <Text style={styles.subtitle}>
              Enter the email or phone on your account and we will send a six-digit code.
            </Text>
          </View>

          <View style={styles.form}>
            <TextField
              label="Email / Phone"
              value={contact}
              onChangeText={setContact}
              placeholder="filipsjonrey@gmail.com"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="username"
            />
            <Button
              label="Send code"
              disabled={!ready}
              onPress={() =>
                router.push({
                  pathname: "/verify-code",
                  params: { to: contact.trim() },
                })
              }
            />
          </View>

          <View style={styles.spacer} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Remembered it?</Text>
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              hitSlop={8}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.footerLink}>Log in</Text>
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
    paddingTop: spacing.lg,
  },
  back: {
    width: layout.touchTarget,
    height: layout.touchTarget,
    marginLeft: -12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...type.display,
    fontSize: 31,
    lineHeight: 34,
    marginTop: 18,
  },
  subtitle: {
    ...type.body,
    color: colors.textBody,
    marginTop: spacing.sm + 2,
  },
  form: {
    gap: spacing.lg,
    paddingTop: spacing.xl + spacing.sm,
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
