// Whether the lawyer is taking work, when, and for how much.

import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

import {
  BackHeader,
  Button,
  Chip,
  GroupedList,
  Rule,
  Screen,
  ScreenScroll,
  TextField,
  Toggle,
} from "@/components/ui";
import { ME_AS_LAWYER, REPLY_TARGETS, WEEK } from "@/data";
import { usePracticeSettings } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";

export default function AvailabilityScreen() {
  const {
    acceptingClients,
    toggleAccepting,
    workingDayIds,
    toggleWorkingDay,
    replyTarget,
    setReplyTarget,
  } = usePracticeSettings();

  return (
    <Screen>
      <BackHeader title="Availability & fees" size="sm" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenScroll>
          <View style={styles.block}>
            <Pressable
              onPress={toggleAccepting}
              accessibilityRole="switch"
              accessibilityLabel="Accepting new clients"
              accessibilityState={{ checked: acceptingClients }}
              style={[
                styles.accepting,
                {
                  borderColor: acceptingClients ? colors.ink : colors.border,
                  backgroundColor: acceptingClients ? colors.tint : colors.white,
                },
              ]}
            >
              <View style={styles.acceptingBody}>
                <Text style={styles.acceptingTitle}>Accepting new clients</Text>
                <Text style={styles.acceptingHint}>
                  {acceptingClients
                    ? "You appear in search and can receive requests."
                    : "Hidden from search. Existing matters are unaffected."}
                </Text>
              </View>
              <Toggle on={acceptingClients} />
            </Pressable>
          </View>

          <View style={styles.block}>
            <Text style={styles.sectionTitle}>Consulting hours</Text>
            <GroupedList>
              {WEEK.map((day, index) => {
                const on = workingDayIds.includes(day.id);
                return (
                  <View key={day.id}>
                    <Pressable
                      onPress={() => toggleWorkingDay(day.id)}
                      accessibilityRole="switch"
                      accessibilityLabel={day.short}
                      accessibilityState={{ checked: on }}
                      style={({ pressed }) => [styles.day, pressed && styles.pressed]}
                    >
                      <Text style={styles.dayShort}>{day.short}</Text>
                      <Text
                        style={[
                          styles.dayHours,
                          { color: on ? colors.textStrong : colors.textDisabled },
                        ]}
                      >
                        {on ? day.hours : "Not available"}
                      </Text>
                      <Toggle on={on} size="sm" />
                    </Pressable>
                    {index < WEEK.length - 1 ? <Rule /> : null}
                  </View>
                );
              })}
            </GroupedList>
          </View>

          <View style={styles.block}>
            <Text style={styles.sectionTitle}>Fees</Text>
            <View style={styles.form}>
              <TextField label="First consultation" defaultValue={ME_AS_LAWYER.fee} />
              <TextField
                label="Hourly rate thereafter"
                defaultValue={ME_AS_LAWYER.hourly.replace("/hr", "")}
              />

              <View style={styles.targetBlock}>
                <Text style={styles.label}>Reply target</Text>
                <View style={styles.targetRow}>
                  {REPLY_TARGETS.map((target) => (
                    <Chip
                      key={target}
                      label={target}
                      grow
                      size="md"
                      selected={replyTarget === target}
                      onPress={() => setReplyTarget(target)}
                    />
                  ))}
                </View>
                <Text style={styles.targetHint}>
                  Shown on your profile as median reply time. Missing it repeatedly lowers your
                  ranking.
                </Text>
              </View>

              <Button label="Save changes" onPress={() => router.back()} />
            </View>
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
  block: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    ...type.sectionLabel,
    marginBottom: 11,
  },
  accepting: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    padding: 15,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  acceptingBody: {
    flex: 1,
    minWidth: 0,
  },
  acceptingTitle: {
    ...type.bodySemi,
  },
  acceptingHint: {
    ...type.caption,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textBody,
    marginTop: 3,
  },
  day: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    minHeight: 56,
    paddingVertical: 11,
    paddingHorizontal: 15,
  },
  dayShort: {
    ...type.bodySemi,
    width: 42,
    flexShrink: 0,
    fontSize: 13.5,
  },
  dayHours: {
    ...type.body,
    flex: 1,
    minWidth: 0,
    fontSize: 14,
  },
  form: {
    gap: spacing.lg,
  },
  targetBlock: {
    gap: spacing.sm + 2,
  },
  label: {
    ...type.fieldLabel,
  },
  targetRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  targetHint: {
    ...type.caption,
    fontSize: 12.5,
    lineHeight: 18,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
});
