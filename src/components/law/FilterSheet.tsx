// The lawyer filter sheet, opened from the home, lawyers and posts headers.

import { Pressable, StyleSheet, Text, View } from "react-native";

import { Button, Chip, ChipWrap, Icon, Sheet } from "@/components/ui";
import { FILTER_AREAS } from "@/data";
import { useFilters } from "@/state/app-state";
import { colors, radius, spacing, type } from "@/theme";

export interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
}

const SORTS = ["Nearby", "Popular"] as const;

export function FilterSheet({ visible, onClose }: FilterSheetProps) {
  const { filters, toggleFilterArea, setSort, setMinRating, resetFilters } = useFilters();

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title="Filters"
      footer={
        <>
          <Button label="Reset" onPress={resetFilters} variant="quiet" size="md" block={false} />
          <Button label="Show results" onPress={onClose} size="md" style={styles.apply} />
        </>
      }
    >
      <Group title="Filter By Category">
        <ChipWrap>
          {FILTER_AREAS.map((area) => (
            <Chip
              key={area.id}
              label={area.name}
              tone="soft"
              size="md"
              selected={filters.areaIds.includes(area.id)}
              onPress={() => toggleFilterArea(area.id)}
            />
          ))}
        </ChipWrap>
      </Group>

      <Group title="Sort results" ruled>
        <View style={styles.row}>
          {SORTS.map((sort) => (
            <Chip
              key={sort}
              label={sort}
              grow
              size="md"
              selected={filters.sort === sort}
              onPress={() => setSort(sort)}
            />
          ))}
        </View>
      </Group>

      <Group title="Filter By Location" ruled>
        {/* Static in the design — there is no location picker to open yet. */}
        <View style={styles.location}>
          <Icon name="map-pin" size={17} color={colors.ink} />
          <Text style={styles.locationLabel}>Newyork, USA</Text>
          <Icon name="chevron-down" size={17} color={colors.textDisabled} />
        </View>
      </Group>

      <Group
        title="Minimum rating"
        ruled
        trailing={filters.minRating ? `${filters.minRating}.0 and up` : "Any"}
      >
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((n) => {
            const lit = n <= filters.minRating;
            return (
              <Pressable
                key={n}
                onPress={() => setMinRating(n)}
                accessibilityRole="button"
                accessibilityLabel={`${n} stars and up`}
                style={[styles.star, { backgroundColor: lit ? colors.tint : colors.surface }]}
              >
                <Icon name="star" size={20} color={lit ? colors.yellow : colors.starEmpty} />
              </Pressable>
            );
          })}
        </View>
      </Group>
    </Sheet>
  );
}

function Group({
  title,
  trailing,
  ruled = false,
  children,
}: {
  title: string;
  trailing?: string;
  ruled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={[styles.group, ruled && styles.ruled]}>
      <View style={styles.groupHead}>
        <Text style={styles.groupTitle}>{title}</Text>
        {trailing ? <Text style={styles.groupTrailing}>{trailing}</Text> : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    paddingBottom: spacing.xl,
  },
  ruled: {
    borderTopWidth: 1,
    borderTopColor: colors.cream,
    paddingTop: 18,
  },
  groupHead: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: spacing.md - 1,
  },
  groupTitle: {
    ...type.fieldLabel,
  },
  groupTrailing: {
    ...type.link,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    minHeight: 52,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
  },
  locationLabel: {
    ...type.bodyMedium,
    flex: 1,
  },
  stars: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  star: {
    flex: 1,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
  },
  apply: {
    flex: 1,
  },
});
