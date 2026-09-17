// A row in the notifications feed.

import { StyleSheet, Text, View } from "react-native";

import { Avatar, LogoMark } from "@/components/ui";
import { colors, layout, radius, spacing, type } from "@/theme";
import type { Alert } from "@/types";

export function AlertRow({ alert }: { alert: Alert }) {
  return (
    <View
      style={[styles.row, { backgroundColor: alert.unread ? colors.unread : colors.white }]}
    >
      {alert.photo ? (
        <Avatar source={alert.photo} size={40} cornerRadius={radius.sm} />
      ) : (
        // Platform notices have no sender, so they carry the Lawey mark.
        <View style={styles.mark}>
          <LogoMark size={24} />
        </View>
      )}
      <View style={styles.body}>
        <Text style={styles.text}>{alert.text}</Text>
        <Text style={styles.time}>{alert.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md + 1,
    paddingVertical: spacing.lg - 2,
    paddingHorizontal: layout.gutter,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  mark: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.tint,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  text: {
    ...type.lede,
    color: colors.text,
  },
  time: {
    ...type.caption,
    marginTop: spacing.xxs,
  },
});
