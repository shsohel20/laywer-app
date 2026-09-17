// "Request a consultation" — the sheet on a lawyer's profile.
//
// Two states in one sheet: the form, and the confirmation once it is sent. The
// send button stays disabled until there is enough detail to be worth a
// lawyer's time, which is the design's rule, not an arbitrary one.

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Avatar, Button, Chip, ChipWrap, Icon, Sheet, TextField } from "@/components/ui";
import { URGENCY_OPTIONS } from "@/data";
import { colors, radius, spacing, type } from "@/theme";
import type { Lawyer } from "@/types";

/** Below this, the note is not a brief — it is a greeting. */
const MIN_NOTE_LENGTH = 10;

export interface RequestSheetProps {
  visible: boolean;
  onClose: () => void;
  lawyer: Lawyer;
  /** Called from "Track it" on the confirmation screen. */
  onTrack: () => void;
}

export function RequestSheet({ visible, onClose, lawyer, onTrack }: RequestSheetProps) {
  const [area, setArea] = useState(lawyer.areas[0]);
  const [note, setNote] = useState("");
  const [urgency, setUrgency] = useState(URGENCY_OPTIONS[0]);
  const [sent, setSent] = useState(false);

  const ready = note.trim().length > MIN_NOTE_LENGTH;

  const close = () => {
    onClose();
    // Reset once closed so reopening starts clean.
    setSent(false);
    setNote("");
    setArea(lawyer.areas[0]);
  };

  if (sent) {
    return (
      <Sheet visible={visible} onClose={close} scroll={false} maxHeight="92%">
        <View style={styles.sentBody}>
          <View style={styles.sentBadge}>
            <Icon name="check" size={28} color={colors.ink} strokeWidth={2.6} />
          </View>
          <Text style={styles.sentTitle}>Request sent</Text>
          <Text style={styles.sentNote}>
            {lawyer.name} replies in about {lawyer.replyTime}. You will get a notification either
            way, and nothing is charged unless the request is accepted.
          </Text>
          <View style={styles.sentActions}>
            <Button label="Close" onPress={close} variant="quiet" size="md" style={styles.half} />
            <Button
              label="Track it"
              onPress={() => {
                close();
                onTrack();
              }}
              size="md"
              style={styles.half}
            />
          </View>
        </View>
      </Sheet>
    );
  }

  return (
    <Sheet
      visible={visible}
      onClose={close}
      title="Request a consultation"
      maxHeight="92%"
      footer={
        <>
          <Button label="Cancel" onPress={close} variant="quiet" size="md" block={false} />
          <Button
            label={ready ? "Send request" : "Add a few details"}
            onPress={() => setSent(true)}
            disabled={!ready}
            size="md"
            style={styles.send}
          />
        </>
      }
    >
      <View style={styles.lawyer}>
        <Avatar source={lawyer.photo} size={44} cornerRadius={radius.sm} />
        <View style={styles.lawyerBody}>
          <Text style={styles.lawyerName}>{lawyer.name}</Text>
          <Text style={styles.lawyerMeta}>
            {lawyer.fee} first consultation · replies in {lawyer.replyTime}
          </Text>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.label}>What is it about?</Text>
        <ChipWrap>
          {lawyer.areas.map((option) => (
            <Chip
              key={option}
              label={option}
              tone="soft"
              selected={area === option}
              onPress={() => setArea(option)}
            />
          ))}
        </ChipWrap>
      </View>

      <TextField
        label="Tell them what happened"
        rows={4}
        value={note}
        onChangeText={setNote}
        placeholder="A few sentences is enough. Dates and deadlines help most."
        style={styles.block}
      />

      <View style={styles.block}>
        <Text style={styles.label}>How soon do you need help?</Text>
        <View style={styles.row}>
          {URGENCY_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={option}
              grow
              size="md"
              selected={urgency === option}
              onPress={() => setUrgency(option)}
            />
          ))}
        </View>
      </View>

      <View style={styles.attach}>
        <Icon name="paperclip" size={18} color={colors.amber} />
        <Text style={styles.attachLabel}>Attach documents</Text>
        <Text style={styles.attachHint}>Optional</Text>
      </View>

      <Text style={styles.disclaimer}>
        Sending a request does not create a lawyer-client relationship until it is accepted.
        Nothing is charged now.
      </Text>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  lawyer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  lawyerBody: {
    flex: 1,
    minWidth: 0,
  },
  lawyerName: {
    ...type.bodySemi,
    fontSize: 14.5,
  },
  lawyerMeta: {
    ...type.caption,
    fontSize: 12.5,
    marginTop: 2,
  },
  block: {
    gap: spacing.sm + 2,
    paddingTop: spacing.xl,
  },
  label: {
    ...type.fieldLabel,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  attach: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    minHeight: 54,
    marginTop: 18,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: 13,
    backgroundColor: colors.surface,
  },
  attachLabel: {
    ...type.bodySemi,
    flex: 1,
    minWidth: 0,
    fontSize: 14,
  },
  attachHint: {
    ...type.caption,
    fontSize: 12.5,
    flexShrink: 0,
  },
  disclaimer: {
    ...type.caption,
    lineHeight: 18,
    marginTop: spacing.lg - 2,
    marginBottom: spacing.lg,
  },
  send: {
    flex: 1,
  },
  sentBody: {
    alignItems: "center",
    gap: spacing.lg - 2,
    paddingTop: 34,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xs,
  },
  sentBadge: {
    alignItems: "center",
    justifyContent: "center",
    width: 58,
    height: 58,
    borderRadius: radius.xl,
    backgroundColor: colors.yellow,
  },
  sentTitle: {
    ...type.pageTitle,
    textAlign: "center",
  },
  sentNote: {
    ...type.lede,
    textAlign: "center",
    lineHeight: 22,
  },
  sentActions: {
    flexDirection: "row",
    gap: 9,
    alignSelf: "stretch",
    marginTop: spacing.xxs,
  },
  half: {
    flex: 1,
  },
});
