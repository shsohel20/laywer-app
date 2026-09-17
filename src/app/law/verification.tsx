// Bar admission and identity checks.

import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  BackHeader,
  Button,
  GroupedList,
  Icon,
  InkPanel,
  Pill,
  Rule,
  Screen,
  ScreenScroll,
} from "@/components/ui";
import { VERIFY_DOCS } from "@/data";
import { colors, layout, radius, spacing, type } from "@/theme";
import type { VerifyStatus } from "@/types";

const TONES = { VERIFIED: "strong", CHECKING: "soft", NEEDED: "muted" } as const;

export default function VerificationScreen() {
  const received = VERIFY_DOCS.filter((doc) => doc.provided).length;

  return (
    <Screen>
      <BackHeader title="Verification" size="sm" />
      <ScreenScroll>
        <View style={styles.block}>
          <InkPanel>
            <View style={styles.statusRow}>
              <View style={styles.statusIcon}>
                <Icon name="clock" size={17} color={colors.ink} strokeWidth={2.2} />
              </View>
              <Text style={styles.statusTitle}>Pending review</Text>
            </View>
            <Text style={styles.statusBody}>
              {received} of {VERIFY_DOCS.length} documents received. We verify bar admission
              directly with the licensing body, which usually takes two business days.
            </Text>
            <View style={styles.progress}>
              {VERIFY_DOCS.map((doc) => (
                <View
                  key={doc.id}
                  style={[
                    styles.progressStep,
                    { backgroundColor: doc.provided ? colors.yellow : colors.onDarkTrack },
                  ]}
                />
              ))}
            </View>
          </InkPanel>
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Documents</Text>
          <GroupedList>
            {VERIFY_DOCS.map((doc, index) => (
              <View key={doc.id}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${doc.label}, ${doc.status.toLowerCase()}`}
                  style={({ pressed }) => [styles.doc, pressed && styles.pressed]}
                >
                  <View
                    style={[
                      styles.docIcon,
                      { backgroundColor: doc.provided ? colors.tint : colors.surface },
                    ]}
                  >
                    <Icon
                      name={doc.provided ? "check" : "upload"}
                      size={17}
                      color={doc.provided ? colors.amber : colors.textMuted}
                      strokeWidth={doc.provided ? 2.4 : 2}
                    />
                  </View>
                  <View style={styles.docBody}>
                    <Text style={styles.docLabel}>{doc.label}</Text>
                    <Text style={styles.docMeta}>{doc.meta}</Text>
                  </View>
                  <Pill label={doc.status} tone={TONES[doc.status as VerifyStatus]} />
                </Pressable>
                {index < VERIFY_DOCS.length - 1 ? <Rule /> : null}
              </View>
            ))}
          </GroupedList>
        </View>

        <View style={styles.block}>
          <Button label="Submit for review" onPress={() => router.back()} />
          <Text style={styles.footnote}>
            Documents are held encrypted and are never shown to clients.
          </Text>
        </View>
      </ScreenScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    ...type.sectionLabel,
    marginBottom: 11,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
  },
  statusIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: spacing.sm + 2,
    backgroundColor: colors.yellow,
  },
  statusTitle: {
    ...type.h3,
    fontSize: 15.5,
    color: colors.white,
  },
  statusBody: {
    ...type.lede,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.onDarkMuted,
    marginTop: spacing.md,
  },
  progress: {
    flexDirection: "row",
    gap: 5,
    marginTop: spacing.lg,
  },
  progressStep: {
    flex: 1,
    height: 5,
    borderRadius: 3,
  },
  doc: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md + 1,
    minHeight: 66,
    paddingVertical: spacing.md,
    paddingHorizontal: 15,
  },
  docIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    flexShrink: 0,
    borderRadius: radius.sm - 1,
  },
  docBody: {
    flex: 1,
    minWidth: 0,
  },
  docLabel: {
    ...type.bodyMedium,
    fontSize: 14.5,
    lineHeight: 20,
  },
  docMeta: {
    ...type.caption,
    fontSize: 12.5,
    marginTop: 2,
  },
  footnote: {
    ...type.caption,
    textAlign: "center",
    lineHeight: 18,
    marginTop: spacing.lg - 2,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
});
