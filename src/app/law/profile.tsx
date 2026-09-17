// The lawyer's public profile, as they edit it.

import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

import {
  Avatar,
  BackHeader,
  Button,
  Chip,
  ChipWrap,
  Lede,
  Screen,
  ScreenScroll,
  TextField,
} from "@/components/ui";
import { LAWYER_AREA_OPTIONS, ME_AS_LAWYER } from "@/data";
import { usePracticeSettings } from "@/state/app-state";
import { layout, radius, spacing, type } from "@/theme";

export default function LawyerProfileEditScreen() {
  const { myAreas, toggleMyArea } = usePracticeSettings();

  return (
    <Screen>
      <BackHeader title="My public profile" size="sm" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenScroll>
          <Lede>This is what clients see before they send a request.</Lede>

          <View style={styles.photoRow}>
            <Avatar source={ME_AS_LAWYER.photo} size={74} cornerRadius={radius.xxl} />
            <View style={styles.photoActions}>
              <Button label="Change photo" size="sm" block={false} style={styles.photoButton} />
              <Text style={styles.photoHint}>A plain headshot works best</Text>
            </View>
          </View>

          <View style={styles.form}>
            <TextField label="Display name" defaultValue={ME_AS_LAWYER.name} />
            <TextField label="Headline specialism" defaultValue={ME_AS_LAWYER.specialism} />
            <TextField label="About" rows={5} defaultValue={ME_AS_LAWYER.blurb} />

            <View style={styles.areas}>
              <Text style={styles.label}>Practice areas</Text>
              <ChipWrap>
                {LAWYER_AREA_OPTIONS.map((area) => (
                  <Chip
                    key={area}
                    label={area}
                    tone="soft"
                    size="md"
                    selected={myAreas.includes(area)}
                    onPress={() => toggleMyArea(area)}
                  />
                ))}
              </ChipWrap>
            </View>

            <TextField label="Chambers address" defaultValue={ME_AS_LAWYER.chambers} />
            <TextField label="Languages" defaultValue={ME_AS_LAWYER.languages} />

            <Button
              label="Preview as client"
              icon="eye"
              variant="outline"
              onPress={() => router.push(`/lawyer/${ME_AS_LAWYER.id}`)}
            />
            <Button label="Save profile" onPress={() => router.back()} />
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
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg - 2,
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.xl,
  },
  photoActions: {
    gap: spacing.sm,
  },
  photoButton: {
    minHeight: 42,
    paddingHorizontal: spacing.lg,
  },
  photoHint: {
    ...type.caption,
  },
  form: {
    gap: spacing.lg,
    paddingHorizontal: layout.gutter,
  },
  areas: {
    gap: spacing.sm + 2,
  },
  label: {
    ...type.fieldLabel,
  },
});
