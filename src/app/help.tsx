// Help centre.

import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  BackHeader,
  Button,
  GroupedList,
  Icon,
  InkPanel,
  Rule,
  Screen,
  ScreenScroll,
  SearchField,
} from "@/components/ui";
import { HELP_TOPICS } from "@/data";
import { colors, layout, spacing, type } from "@/theme";

export default function HelpScreen() {
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();
  const topics = term
    ? HELP_TOPICS.filter((topic) => topic.toLowerCase().includes(term))
    : HELP_TOPICS;

  return (
    <Screen>
      <BackHeader title="Help centre" size="sm" />
      <ScreenScroll>
        <View style={styles.search}>
          <SearchField
            value={query}
            onChangeText={setQuery}
            placeholder="Search help articles"
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Common questions</Text>
          <GroupedList>
            {topics.map((topic, index) => (
              <View key={topic}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={topic}
                  style={({ pressed }) => [styles.topic, pressed && styles.pressed]}
                >
                  <Text style={styles.topicLabel}>{topic}</Text>
                  <Icon name="chevron-right" size={17} color={colors.textDisabled} />
                </Pressable>
                {index < topics.length - 1 ? <Rule /> : null}
              </View>
            ))}
            {topics.length === 0 ? (
              <View style={styles.topic}>
                <Text style={styles.noResults}>
                  No articles match “{query.trim()}”. Try contacting support below.
                </Text>
              </View>
            ) : null}
          </GroupedList>
        </View>

        <View style={styles.block}>
          <InkPanel>
            <Text style={styles.panelTitle}>Still stuck?</Text>
            <Text style={styles.panelBody}>
              Send us the details and we reply within one business day. Urgent legal matters
              should go to a lawyer, not support.
            </Text>
            <Button label="Contact support" size="sm" style={styles.panelButton} />
          </InkPanel>
        </View>
      </ScreenScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    paddingHorizontal: layout.gutter,
    paddingTop: spacing.xs,
    paddingBottom: 18,
  },
  block: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.xl,
  },
  blockTitle: {
    ...type.sectionLabel,
    marginBottom: 11,
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 56,
    paddingVertical: spacing.md,
    paddingHorizontal: 15,
  },
  topicLabel: {
    ...type.bodyMedium,
    flex: 1,
    minWidth: 0,
    fontSize: 14.5,
    lineHeight: 20,
  },
  noResults: {
    ...type.lede,
    flex: 1,
  },
  panelTitle: {
    ...type.h3,
    fontSize: 16,
    color: colors.white,
  },
  panelBody: {
    ...type.lede,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.onDarkMuted,
    marginTop: spacing.md,
  },
  panelButton: {
    minHeight: 46,
    marginTop: spacing.lg,
  },
  pressed: {
    backgroundColor: colors.surface,
  },
});
