// Change password.

import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

import { BackHeader, Button, Lede, Screen, ScreenScroll, TextField } from "@/components/ui";
import { PASSWORD_RULES } from "@/lib/password";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function PasswordScreen() {
  return (
    <Screen>
      <BackHeader title="Password" size="sm" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenScroll>
          <Lede>Last changed 4 months ago. Changing it signs out every other device.</Lede>

          <View style={styles.form}>
            <TextField label="Current password" placeholder="••••••••" secureTextEntry />
            <TextField
              label="New password"
              placeholder="At least 8 characters"
              secureTextEntry
              textContentType="newPassword"
            />
            <TextField label="Confirm new password" placeholder="Repeat it" secureTextEntry />

            <View style={styles.rules}>
              <Text style={styles.rulesTitle}>MUST INCLUDE</Text>
              {PASSWORD_RULES.map((rule) => (
                <View key={rule.label} style={styles.rule}>
                  <View style={styles.bullet} />
                  <Text style={styles.ruleText}>{rule.label}</Text>
                </View>
              ))}
            </View>

            <Button label="Update password" onPress={() => router.back()} />
            <Button label="Cancel" variant="quiet" onPress={() => router.back()} />
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
  form: {
    gap: spacing.lg,
    paddingHorizontal: layout.gutter,
  },
  rules: {
    gap: 9,
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
    gap: 9,
  },
  bullet: {
    width: 5,
    height: 5,
    flexShrink: 0,
    borderRadius: radius.full,
    backgroundColor: colors.yellow,
  },
  ruleText: {
    ...type.body,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.textStrong,
  },
});
