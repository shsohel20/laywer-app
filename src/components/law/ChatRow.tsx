// A thread in the Messages list.

import { Pressable, StyleSheet, Text, View } from "react-native";

import { Avatar, Icon } from "@/components/ui";
import { colors, layout, radius, spacing, type } from "@/theme";
import type { Chat } from "@/types";

export interface ChatRowProps {
  chat: Chat;
  onPress: () => void;
}

export function ChatRow({ chat, onPress }: ChatRowProps) {
  const unread = chat.unread > 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${chat.name}, ${chat.matter}`}
      accessibilityHint={unread ? `${chat.unread} unread messages` : undefined}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: pressed ? colors.surface : unread ? colors.unread : colors.white },
      ]}
    >
      <Avatar
        source={chat.photo}
        size={50}
        shape="circle"
        presence={chat.online ? "online" : "offline"}
      />

      <View style={styles.body}>
        <View style={styles.topLine}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={[styles.time, unread && styles.timeUnread]}>{chat.time}</Text>
        </View>

        <Text style={styles.matter} numberOfLines={1}>
          {chat.matter}
        </Text>

        <View style={styles.previewLine}>
          {/* A read receipt only makes sense on a message we sent. */}
          {chat.lastFromMe && !unread ? (
            <Icon name="check-double" size={13} color={colors.amber} />
          ) : null}
          <Text
            style={[styles.preview, unread && styles.previewUnread]}
            numberOfLines={1}
          >
            {chat.preview}
          </Text>
          {unread ? (
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>{chat.unread}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md + 1,
    minHeight: 78,
    paddingVertical: 13,
    paddingHorizontal: layout.gutter,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: spacing.sm + 2,
  },
  name: {
    ...type.bodySemi,
    flexShrink: 1,
    letterSpacing: -0.15,
  },
  time: {
    ...type.caption,
    flexShrink: 0,
  },
  timeUnread: {
    color: colors.amber,
  },
  matter: {
    ...type.caption,
    color: colors.amber,
    marginTop: 3,
  },
  previewLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 1,
    marginTop: 5,
  },
  preview: {
    ...type.caption,
    flex: 1,
    minWidth: 0,
    fontSize: 13,
    lineHeight: 18,
  },
  previewUnread: {
    fontFamily: type.bodySemi.fontFamily,
    color: colors.text,
  },
  badge: {
    flexShrink: 0,
    minWidth: 21,
    height: 21,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.yellow,
  },
  badgeLabel: {
    ...type.pill,
    letterSpacing: 0,
  },
});
