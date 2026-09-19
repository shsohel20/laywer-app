// Identity checks — one screen, both sides of the marketplace.
//
// The checklist comes from the active role: a client proves they are a real
// person, a lawyer proves that plus the right to practise. The process around
// it — add documents, submit, wait for review — is identical, so it is not
// worth two screens.

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
  type PillTone,
} from "@/components/ui";
import { VERIFY_COPY, VERIFY_FORMATS, VERIFY_ICONS } from "@/data";
import { useSession, useVerification } from "@/state/app-state";
import { colors, layout, radius, spacing, type } from "@/theme";
import type { VerifyDocStatus, VerifyStatus } from "@/types";

const DOC_TONES: Record<VerifyDocStatus, PillTone> = {
  NEEDED: "muted",
  ADDED: "strong",
  CHECKING: "soft",
  VERIFIED: "strong",
};

const TITLES: Record<VerifyStatus, string> = {
  unverified: "Not verified yet",
  pending: "Pending review",
  verified: "Verified",
};

/** A document's state follows the submission it belongs to. */
function docStatusFor(provided: boolean, status: VerifyStatus): VerifyDocStatus {
  if (status === "verified") return "VERIFIED";
  if (!provided) return "NEEDED";
  return status === "pending" ? "CHECKING" : "ADDED";
}

export default function VerificationScreen() {
  const { role } = useSession();
  const { docs, status, providedCount, isProvided, toggleDoc, canSubmit, submit, withdraw } =
    useVerification();

  const copy = VERIFY_COPY[role];
  // Documents are fixed while a reviewer holds them; withdrawing reopens them.
  const editable = status === "unverified";
  const outstanding = docs.length - providedCount;

  const summary =
    status === "verified"
      ? `All ${docs.length} documents checked. ${copy.verified}`
      : status === "pending"
        ? `${docs.length} documents received. ${copy.blurb}`
        : `${providedCount} of ${docs.length} documents added. ${copy.unverified}`;

  const footnote =
    editable && outstanding > 0
      ? `Add the ${outstanding} outstanding document${outstanding === 1 ? "" : "s"} to submit. ${copy.footnote}`
      : copy.footnote;

  return (
    <Screen>
      <BackHeader title="Verification" size="sm" />
      <ScreenScroll>
        <View style={styles.block}>
          <InkPanel>
            <View style={styles.statusRow}>
              <View style={styles.statusIcon}>
                <Icon
                  name={VERIFY_ICONS[status]}
                  size={17}
                  color={colors.ink}
                  strokeWidth={2.2}
                />
              </View>
              <Text style={styles.statusTitle}>{TITLES[status]}</Text>
            </View>
            <Text style={styles.statusBody}>{summary}</Text>
            <View
              style={styles.progress}
              accessibilityRole="progressbar"
              accessibilityLabel={`${providedCount} of ${docs.length} documents added`}
              accessibilityValue={{ min: 0, max: docs.length, now: providedCount }}
            >
              {docs.map((doc) => (
                <View
                  key={doc.id}
                  style={[
                    styles.progressStep,
                    { backgroundColor: isProvided(doc.id) ? colors.yellow : colors.onDarkTrack },
                  ]}
                />
              ))}
            </View>
          </InkPanel>
        </View>

        <View style={styles.block}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Documents</Text>
            <Text style={styles.sectionNote}>{VERIFY_FORMATS}</Text>
          </View>
          <GroupedList>
            {docs.map((doc, index) => {
              const provided = isProvided(doc.id);
              const docStatus = docStatusFor(provided, status);

              return (
                <View key={doc.id}>
                  <Pressable
                    onPress={editable ? () => toggleDoc(doc.id) : undefined}
                    disabled={!editable}
                    accessibilityRole="button"
                    accessibilityLabel={`${doc.label}, ${docStatus.toLowerCase()}`}
                    accessibilityHint={
                      editable
                        ? provided
                          ? "Removes this document"
                          : "Adds this document"
                        : undefined
                    }
                    style={({ pressed }) => [styles.doc, pressed && styles.pressed]}
                  >
                    <View
                      style={[
                        styles.docIcon,
                        { backgroundColor: provided ? colors.tint : colors.surface },
                      ]}
                    >
                      <Icon
                        name={provided ? "check" : "upload"}
                        size={17}
                        color={provided ? colors.amber : colors.textMuted}
                        strokeWidth={provided ? 2.4 : 2}
                      />
                    </View>
                    <View style={styles.docBody}>
                      <Text style={styles.docLabel}>{doc.label}</Text>
                      <Text style={styles.docMeta}>
                        {provided ? doc.file : doc.requirement}
                      </Text>
                    </View>
                    <Pill label={docStatus} tone={DOC_TONES[docStatus]} />
                  </Pressable>
                  {index < docs.length - 1 ? <Rule /> : null}
                </View>
              );
            })}
          </GroupedList>
        </View>

        <View style={styles.block}>
          {status === "pending" ? (
            <Button
              label="Withdraw submission"
              variant="outline"
              onPress={withdraw}
              accessibilityHint="Takes the documents out of review so they can be changed"
            />
          ) : status === "unverified" ? (
            <Button label="Submit for review" disabled={!canSubmit} onPress={submit} />
          ) : null}
          <Text style={styles.footnote}>{footnote}</Text>
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
  sectionHead: {
    marginBottom: 11,
  },
  sectionTitle: {
    ...type.sectionLabel,
  },
  sectionNote: {
    ...type.caption,
    fontSize: 12.5,
    marginTop: 3,
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
