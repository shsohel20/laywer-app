// A conversation thread.

import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MessageBubble } from "@/components/law/MessageBubble";
import { Avatar, EmptyState, Icon, IconButton, Screen } from "@/components/ui";
import { QUICK_REPLIES, chatById } from "@/data";
import { useConversations } from "@/state/app-state";
import { colors, radius, spacing, type } from "@/theme";

export default function ThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const { messagesFor, sendMessage } = useConversations();

  const chat = chatById(id);

  if (!chat) {
    return (
      <Screen>
        <EmptyState
          icon="chat"
          message="That conversation is no longer available."
          actionLabel="Back to messages"
          onActionPress={() => router.navigate("/messages")}
        />
      </Screen>
    );
  }

  const messages = messagesFor(chat.id);
  const canSend = draft.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    sendMessage(chat.id, draft);
    setDraft("");
  };

  return (
    <Screen edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.top}
      >
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            label="Go back"
            variant="plain"
            iconSize={21}
            size={40}
            onPress={() => router.back()}
            style={styles.headerBack}
          />
          <Pressable
            onPress={() => router.push(`/lawyer/${chat.id}`)}
            accessibilityRole="button"
            accessibilityLabel={`Open ${chat.name}'s profile`}
            style={({ pressed }) => [styles.headerIdentity, pressed && styles.pressed]}
          >
            <Avatar
              source={chat.photo}
              size={40}
              shape="circle"
              presence={chat.online ? "online" : "offline"}
            />
            <View style={styles.headerBody}>
              <Text style={styles.headerName} numberOfLines={1}>
                {chat.name}
              </Text>
              <Text style={styles.headerPresence} numberOfLines={1}>
                {chat.presence}
              </Text>
            </View>
          </Pressable>
          <IconButton icon="phone" label={`Call ${chat.name}`} iconSize={18} />
        </View>

        <View style={styles.matterBar}>
          <Icon name="doc" size={17} color={colors.amber} strokeWidth={1.9} />
          <View style={styles.matterBody}>
            <Text style={styles.matterTitle} numberOfLines={1}>
              {chat.matter}
            </Text>
            <Text style={styles.matterMeta}>
              {chat.accepted ? "Request accepted · confidential" : "Request declined"}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push(`/lawyer/${chat.id}`)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
          >
            <Text style={styles.profileLabel}>Profile</Text>
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.transcript}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {chat.online ? <TypingIndicator /> : null}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickRail}
          contentContainerStyle={styles.quickContent}
        >
          {QUICK_REPLIES.map((reply) => (
            <Pressable
              key={reply}
              onPress={() => sendMessage(chat.id, reply)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.quick, pressed && { borderColor: colors.ink }]}
            >
              <Text style={styles.quickLabel}>{reply}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
          <IconButton icon="paperclip" label="Attach a file" size={46} />
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
            placeholder="Write a message"
            placeholderTextColor={colors.placeholder}
            returnKeyType="send"
            style={styles.input}
          />
          <Pressable
            onPress={send}
            disabled={!canSend}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            accessibilityState={{ disabled: !canSend }}
            style={[styles.send, { backgroundColor: canSend ? colors.yellow : colors.disabled }]}
          >
            <Icon
              name="send"
              size={19}
              color={canSend ? colors.ink : colors.textDisabled}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

/** Three dots while the other side is composing. */
function TypingIndicator() {
  return (
    <View style={styles.typing} accessibilityLabel="Typing">
      {[0, 1, 2].map((i) => (
        <View key={i} style={styles.typingDot} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream,
  },
  headerBack: {
    marginLeft: -10,
  },
  headerIdentity: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  headerBody: {
    flex: 1,
    minWidth: 0,
  },
  headerName: {
    ...type.bodySemi,
    letterSpacing: -0.15,
  },
  headerPresence: {
    ...type.caption,
    marginTop: 2,
  },
  matterBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 11,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream,
    backgroundColor: colors.tint,
  },
  matterBody: {
    flex: 1,
    minWidth: 0,
  },
  matterTitle: {
    ...type.bodySemi,
    fontSize: 13,
  },
  matterMeta: {
    ...type.caption,
    fontSize: 11.5,
    color: colors.amber,
    marginTop: 1,
  },
  profileButton: {
    flexShrink: 0,
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: colors.ink,
    borderRadius: radius.full,
  },
  profileLabel: {
    ...type.pill,
    fontFamily: type.bodySemi.fontFamily,
    fontSize: 12,
    letterSpacing: 0,
  },
  transcript: {
    gap: spacing.sm + 2,
    padding: spacing.lg,
  },
  typing: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.cream,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.surface,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.textDisabled,
  },
  quickRail: {
    flexGrow: 0,
  },
  quickContent: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm + 2,
  },
  quick: {
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  quickLabel: {
    ...type.captionMedium,
    fontSize: 13,
    color: colors.textStrong,
  },
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 9,
    paddingTop: 11,
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.cream,
    backgroundColor: colors.white,
  },
  input: {
    ...type.body,
    flex: 1,
    minWidth: 0,
    minHeight: 46,
    maxHeight: 110,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  send: {
    width: 46,
    height: 46,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
  },
  pressed: {
    opacity: 0.6,
  },
});
