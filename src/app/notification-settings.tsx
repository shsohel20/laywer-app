// What reaches the user, and how.

import { StyleSheet, Text, View } from "react-native";

import { BackHeader, GroupedList, Lede, Rule, Screen, ScreenScroll, ToggleRow } from "@/components/ui";
import { NOTIFICATION_GROUPS } from "@/data";
import { usePreferences } from "@/state/app-state";
import { layout, spacing, type } from "@/theme";

export default function NotificationSettingsScreen() {
  const { notifications, toggleNotification } = usePreferences();

  return (
    <Screen>
      <BackHeader title="Notifications" size="sm" />
      <ScreenScroll>
        <Lede>
          Choose what reaches you. Replies from a lawyer always arrive as a push notification.
        </Lede>

        {NOTIFICATION_GROUPS.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <GroupedList>
              {group.rows.map((row, index) => (
                <View key={row.key}>
                  <ToggleRow
                    label={row.label}
                    hint={row.hint}
                    on={!!notifications[row.key]}
                    onPress={() => toggleNotification(row.key)}
                  />
                  {index < group.rows.length - 1 ? <Rule /> : null}
                </View>
              ))}
            </GroupedList>
          </View>
        ))}
      </ScreenScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  group: {
    paddingHorizontal: layout.gutter,
    paddingBottom: spacing.xl,
  },
  groupTitle: {
    ...type.sectionLabel,
    marginBottom: 11,
  },
});
