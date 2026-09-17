// Step 2 of password recovery: enter the code.

import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { Button, CodeInput, Icon, Screen, ScreenScroll } from "@/components/ui";
import { colors, layout, radius, spacing, type } from "@/theme";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

/**
 * Shows enough of the destination to recognise it, without reprinting an
 * address to anyone holding an unlocked phone.
 */
function maskContact(contact: string): string {
  if (!contact) return "your account";
  const at = contact.indexOf("@");
  if (at > 0) {
    const name = contact.slice(0, at);
    const visible = name.slice(0, 1);
    return `${visible}${"•".repeat(Math.max(name.length - 1, 1))}${contact.slice(at)}`;
  }
  // Phone numbers: keep the last two digits.
  const tail = contact.slice(-2);
  return `${"•".repeat(Math.max(contact.length - 2, 2))}${tail}`;
}

export default function VerifyCodeScreen() {
  const { to } = useLocalSearchParams<{ to?: string }>();
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // One interval for the life of the screen; it stops itself at zero.
  useEffect(() => {
    timer.current = setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const canResend = secondsLeft === 0;
  const complete = code.length === CODE_LENGTH;

  const submit = () => router.push("/reset-password");

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
            <Text style={styles.title}>Enter the code</Text>
            <Text style={styles.subtitle}>
              We sent a {CODE_LENGTH}-digit code to{" "}
              <Text style={styles.contact}>{maskContact(to ?? "")}</Text>. It expires in 10
              minutes.
            </Text>
          </View>

          <View style={styles.form}>
            <CodeInput
              value={code}
              onChangeText={setCode}
              length={CODE_LENGTH}
              onComplete={submit}
            />

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Didn&rsquo;t get it?</Text>
              <Pressable
                onPress={() => {
                  if (canResend) setSecondsLeft(RESEND_SECONDS);
                }}
                disabled={!canResend}
                accessibilityRole="button"
                accessibilityState={{ disabled: !canResend }}
                hitSlop={8}
                style={({ pressed }) => pressed && canResend && styles.pressed}
              >
                <Text style={[styles.resendLink, !canResend && styles.resendWaiting]}>
                  {canResend ? "Send another" : `Send another in ${secondsLeft}s`}
                </Text>
              </Pressable>
            </View>

            <Button label="Verify" disabled={!complete} onPress={submit} />
          </View>

          <View style={styles.spacer} />

          <View style={styles.notice}>
            <Icon name="alert" size={15} color={colors.amber} />
            <Text style={styles.noticeText}>
              Nobody from Lawey will ever ask you for this code.
            </Text>
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
  contact: {
    ...type.bodySemi,
    color: colors.text,
  },
  form: {
    gap: spacing.lg,
    paddingTop: spacing.xl + spacing.sm,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  resendText: {
    ...type.lede,
  },
  resendLink: {
    ...type.bodySemi,
    fontSize: 14,
    color: colors.amber,
  },
  resendWaiting: {
    fontFamily: type.body.fontFamily,
    color: colors.textMuted,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xl,
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
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
  pressed: {
    opacity: 0.6,
  },
});
