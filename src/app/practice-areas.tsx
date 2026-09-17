// Which areas of law the client cares about.

import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { BackHeader, Button, CheckRow, Lede, Screen, ScreenScroll } from "@/components/ui";
import { AREAS } from "@/data";
import { usePreferences } from "@/state/app-state";
import { layout, spacing } from "@/theme";

export default function PracticeAreasScreen() {
  const { areaIds, toggleArea } = usePreferences();

  return (
    <Screen>
      <BackHeader title="Practice areas" size="sm" />
      <ScreenScroll>
        <Lede>
          Pick the areas you care about. Your feed and lawyer suggestions follow this list.
        </Lede>

        <View style={styles.list}>
          {AREAS.map((area) => (
            <CheckRow
              key={area.id}
              label={area.name}
              hint={`${area.lawyerCount} lawyers`}
              checked={areaIds.includes(area.id)}
              onPress={() => toggleArea(area.id)}
            />
          ))}
          <Button
            label={areaIds.length > 0 ? `Save ${areaIds.length} areas` : "Save preferences"}
            onPress={() => router.back()}
            style={styles.submit}
          />
        </View>
      </ScreenScroll>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: layout.gutter,
  },
  submit: {
    marginTop: spacing.xl + 2,
  },
});
