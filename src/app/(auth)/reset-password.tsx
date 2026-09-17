// Step 3 of password recovery: choose a new password.
//
// The rules are checked live rather than only on submit, so the button
// enabling is the same signal as the ticks — there is no hidden second
// standard the user finds out about after tapping.

import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Button, Icon, Screen, ScreenScroll, TextField } from "@/components/ui";
import { PASSWORD_RULES, checkPassword, isStrongEnough } from "@/lib/password";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const results = checkPassword(password);
  const matches = confirm.length > 0 && confirm === password;
  const ready = isStrongEnough(password) && matches;

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
            <Text style={styles.title}>Set a new password</Text>
            <Text style={styles.subtitle}>
              This signs you out everywhere else. You will need the new password on your other
              devices.
            </Text>
          </View>

          <View style={styles.form}>
            <TextField
              label="New password"
              value={password}
              onChangeText={setPassword}
              placeholder="At least 8 characters"
              secureTextEntry
              autoCapitalize="none"
              textContentType="newPassword"
            />
            <TextField
              label="Confirm new password"
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Repeat it"
              secureTextEntry
              autoCapitalize="none"
              textContentType="newPassword"
            />

            {confirm.length > 0 && !matches ? (
              <Text style={styles.mismatch}>Those do not match yet.</Text>
            ) : null}

            <View style={styles.rules}>
              <Text style={styles.rulesTitle}>MUST INCLUDE</Text>
              {PASSWORD_RULES.map((rule, index) => {
                const met = results[index];
                return (
                  <View key={rule.label} style={styles.rule}>
                    <View
                      style={[
                        styles.ruleMark,
                        { backgroundColor: met ? colors.yellow : colors.surface },
                      ]}
                    >
                      {met ? (
                        <Icon name="check" size={11} color={colors.ink} strokeWidth={3} />
                      ) : null}
                    </View>
                    <Text
                      style={[styles.ruleText, { color: met ? colors.text : colors.textMuted }]}
                    >
                      {rule.label}
                    </Text>
                  </View>
                );
              })}
            </View>

            <Button
              label="Save and log in"
              disabled={!ready}
              onPress={() => router.replace("/login")}
            />
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
  mismatch: {
    ...type.caption,
    fontSize: 12.5,
    color: colors.amber,
    marginTop: -spacing.sm,
  },
  rules: {
    gap: spacing.sm + 2,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.lg,
  },
  rulesTitle: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
    letterSpacing: 0.48,
    color: colors.textMuted,
  },
  rule: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
  },
  ruleMark: {
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    borderRadius: radius.full,
  },
  ruleText: {
    ...type.body,
    flex: 1,
    minWidth: 0,
    fontSize: 13.5,
    lineHeight: 19,
  },
  pressed: {
    opacity: 0.6,
  },
});
