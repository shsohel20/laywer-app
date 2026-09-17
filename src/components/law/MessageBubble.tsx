// A single entry in a thread: day marker, system notice, text bubble or the
// document card, plus the timestamp and read receipt under outgoing messages.

import { StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui";
import { colors, radius, spacing, type } from "@/theme";
import type { Message } from "@/types";

export function MessageBubble({ message }: { message: Message }) {
  if (message.kind === "day") {
    return (
      <View style={styles.centred}>
        <Text style={styles.day}>{message.text}</Text>
      </View>
    );
  }

  if (message.kind === "system") {
    return (
      <View style={styles.centred}>
        <Text style={styles.system}>{message.text}</Text>
      </View>
    );
  }

  const mine = message.fromMe;
  const skin = {
    bg: mine ? colors.yellow : colors.surface,
    border: mine ? colors.yellow : colors.cream,
    metaFg: mine ? colors.amber : colors.textMuted,
  };
  const corners = mine
    ? { borderBottomRightRadius: 5 }
    : { borderBottomLeftRadius: 5 };

  return (
    <View style={[styles.group, mine ? styles.mine : styles.theirs]}>
      {message.kind === "text" ? (
        <View
          style={[
            styles.bubble,
            corners,
            { backgroundColor: skin.bg, borderColor: skin.border },
          ]}
        >
          <Text style={styles.text}>{message.text}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.doc,
            corners,
            { backgroundColor: skin.bg, borderColor: skin.border },
          ]}
        >
          <View style={styles.docIcon}>
            <Icon name="doc" size={18} color={colors.ink} />
          </View>
          <View style={styles.docBody}>
            <Text style={styles.docName} numberOfLines={1}>
              {message.text}
            </Text>
            <Text style={[styles.docMeta, { color: skin.metaFg }]}>{message.docMeta}</Text>
          </View>
          <Icon name="download" size={17} color={colors.ink} />
        </View>
      )}

      <View style={[styles.meta, mine ? styles.metaMine : styles.metaTheirs]}>
        <Text style={styles.time}>{message.time}</Text>
        {mine ? (
          <Icon
            name="check-double"
            size={13}
            color={message.read ? colors.amber : colors.textDisabled}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centred: {
    alignItems: "center",
  },
  day: {
    ...type.pill,
    color: colors.textMuted,
    letterSpacing: 0.44,
    paddingVertical: 5,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  system: {
    ...type.caption,
    textAlign: "center",
    lineHeight: 17,
    color: colors.textBody,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg - 2,
    borderWidth: 1,
    borderColor: colors.cream,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  group: {
    maxWidth: "80%",
    gap: spacing.xxs,
  },
  mine: {
    alignSelf: "flex-end",
  },
  theirs: {
    alignSelf: "flex-start",
  },
  bubble: {
    paddingVertical: 11,
    paddingHorizontal: spacing.lg - 2,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  text: {
    ...type.body,
    fontSize: 14.5,
    lineHeight: 21,
  },
  doc: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
  },
  docIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    flexShrink: 0,
    borderRadius: spacing.sm + 2,
    backgroundColor: "rgba(1,2,7,0.08)",
  },
  docBody: {
    flex: 1,
    minWidth: 0,
  },
  docName: {
    ...type.bodySemi,
    fontSize: 13.5,
  },
  docMeta: {
    ...type.caption,
    fontSize: 11.5,
    marginTop: 2,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaMine: {
    alignSelf: "flex-end",
  },
  metaTheirs: {
    alignSelf: "flex-start",
  },
  time: {
    ...type.caption,
    fontSize: 11,
  },
});
