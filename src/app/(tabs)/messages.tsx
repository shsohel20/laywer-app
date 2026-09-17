// The thread list. Titled "Messages" for a client and "Clients" for a lawyer,
// because the same list means something different on each side.

import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ChatRow } from "@/components/law/ChatRow";
import {
  Chip,
  ChipRail,
  EmptyState,
  Pill,
  Screen,
  ScreenHeader,
  ScreenScroll,
  SearchField,
} from "@/components/ui";
import { CHATS, CHAT_FILTERS, type ChatFilter } from "@/data";
import { useConversations, useSession } from "@/state/app-state";
import { layout, spacing } from "@/theme";

export default function MessagesScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ChatFilter>("All");
  const { role } = useSession();
  const { unreadChatCount } = useConversations();

  const chats = useMemo(() => {
    const term = query.trim().toLowerCase();
    return CHATS.filter((chat) => {
      if (filter === "Unread" && chat.unread === 0) return false;
      if (filter === "Active matters" && !chat.accepted) return false;
      if (!term) return true;
      return (
        chat.name.toLowerCase().includes(term) ||
        chat.matter.toLowerCase().includes(term) ||
        chat.preview.toLowerCase().includes(term)
      );
    });
  }, [query, filter]);

  return (
    <Screen>
      <ScreenHeader
        title={role === "lawyer" ? "Clients" : "Messages"}
        trailing={
          <Pill
            label={unreadChatCount > 0 ? `${unreadChatCount} unread` : "All read"}
            tone={unreadChatCount > 0 ? "strong" : "muted"}
          />
        }
      />

      <ScreenScroll>
        <View style={styles.search}>
          <SearchField
            value={query}
            onChangeText={setQuery}
            placeholder="Search messages"
          />
        </View>

        <View style={styles.chips}>
          <ChipRail>
            {CHAT_FILTERS.map((name) => (
              <Chip
                key={name}
                label={name}
                selected={filter === name}
                onPress={() => setFilter(name)}
              />
            ))}
          </ChipRail>
        </View>

        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatRow key={chat.id} chat={chat} onPress={() => router.push(`/chat/${chat.id}`)} />
          ))
        ) : (
          <EmptyState icon="chat" message="Nothing here with that filter." />
        )}
      </ScreenScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.md,
  },
  chips: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.lg - 2,
  },
});
