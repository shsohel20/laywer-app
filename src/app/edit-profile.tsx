// Edit the client's own details.

import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";

import { Avatar, BackHeader, Button, Screen, ScreenScroll, TextField } from "@/components/ui";
import { CURRENT_USER } from "@/data";
import { layout, radius, spacing, type } from "@/theme";

export default function EditProfileScreen() {
  return (
    <Screen>
      <BackHeader title="Edit profile" size="sm" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenScroll>
          <View style={styles.photoRow}>
            <Avatar source={CURRENT_USER.photo} size={74} cornerRadius={radius.xxl} />
            <View style={styles.photoActions}>
              <Button label="Change photo" size="sm" block={false} style={styles.photoButton} />
              <Text style={styles.photoHint}>JPG or PNG, up to 5 MB</Text>
            </View>
          </View>

          <View style={styles.form}>
            <TextField label="Full name" defaultValue={CURRENT_USER.name} />
            <TextField
              label="Email"
              defaultValue={CURRENT_USER.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextField
              label="Phone"
              defaultValue={CURRENT_USER.phone}
              keyboardType="phone-pad"
            />
            <TextField label="Location" defaultValue={CURRENT_USER.location} />
            <TextField label="About you" rows={4} defaultValue={CURRENT_USER.about} />
            <Button label="Save changes" onPress={() => router.back()} style={styles.submit} />
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
    paddingTop: spacing.sm + 2,
    paddingBottom: spacing.xl + 2,
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
  submit: {
    marginTop: spacing.xxs,
  },
});
