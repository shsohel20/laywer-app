// Create account. Same caveat as login: no backend behind it yet.

import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { RoleSelector } from "@/components/law/RoleSelector";
import { Button, Icon, Screen, ScreenScroll, TextField } from "@/components/ui";
import { useSession } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";
import type { Role } from "@/types";

export default function SignupScreen() {
  const { signIn } = useSession();
  const [role, setRole] = useState<Role>("customer");
  const isLawyer = role === "lawyer";

  const submit = () => {
    signIn(role);
    // Either side lands where the verification banner is waiting for them: the
    // dashboard for a lawyer, the account screen for a client.
    router.replace(isLawyer ? "/practice" : "/");
  };

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
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Four fields and you&rsquo;re in.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.roleBlock}>
              <Text style={styles.roleLabel}>I am a</Text>
              <RoleSelector value={role} onChange={setRole} />
              <View style={styles.notice}>
                <Icon name="alert" size={15} color={colors.amber} />
                <Text style={styles.noticeText}>
                  {isLawyer
                    ? "We verify your ID and bar admission before your profile appears in search."
                    : "We verify your ID before your first request reaches a lawyer."}{" "}
                  You can do that after signing up.
                </Text>
              </View>
            </View>

            <TextField label="Full name" placeholder="Filips Jonrey" textContentType="name" />
            <TextField
              label="Email / Phone"
              placeholder="filipsjonrey@gmail.com"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="username"
            />
            <TextField
              label="Password"
              placeholder="At least 8 characters"
              secureTextEntry
              textContentType="newPassword"
            />
            <TextField
              label="Confirm password"
              placeholder="Repeat it"
              secureTextEntry
              textContentType="newPassword"
            />
            <Button label="Create account" onPress={submit} style={styles.submit} />
          </View>

          <View style={styles.spacer} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable
              onPress={() => router.replace("/login")}
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
  roleBlock: {
    gap: spacing.sm + 2,
  },
  roleLabel: {
    ...type.fieldLabel,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm + 2,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.tint,
  },
  noticeText: {
    ...type.caption,
    flex: 1,
    minWidth: 0,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textBody,
  },
  submit: {
    marginTop: spacing.xxs,
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
