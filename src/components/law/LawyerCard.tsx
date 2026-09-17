// The card on the Lawyers list: portrait, headline, blurb and two actions.

import { StyleSheet, Text, View } from "react-native";

import { Avatar, Button, Card, Icon } from "@/components/ui";
import { colors, radius, spacing, type } from "@/theme";
import type { Lawyer } from "@/types";

export interface LawyerCardProps {
  lawyer: Lawyer;
  onOpen: () => void;
  onMessage: () => void;
}

export function LawyerCard({ lawyer, onOpen, onMessage }: LawyerCardProps) {
  return (
    <Card raised>
      <View style={styles.head}>
        <Avatar source={lawyer.photo} size={62} cornerRadius={radius.md} />
        <View style={styles.identity}>
          <Text style={styles.name} numberOfLines={1}>
            {lawyer.name}
          </Text>
          <Text style={styles.specialism} numberOfLines={1}>
            {lawyer.specialism}
          </Text>
          <View style={styles.metaRow}>
            <Icon name="send" size={12} color={colors.textMuted} />
            <Text style={styles.meta} numberOfLines={1}>
              {lawyer.location}
            </Text>
            <View style={styles.dot} />
            <Icon name="star" size={12} color={colors.yellow} />
            <Text style={styles.rating}>{lawyer.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.blurb}>{lawyer.blurb}</Text>

      <View style={styles.actions}>
        <Button
          label="View profile"
          onPress={onOpen}
          size="sm"
          style={styles.primaryAction}
          accessibilityHint={`Opens ${lawyer.name}'s profile`}
        />
        <Button
          label="Message"
          icon="chat"
          onPress={onMessage}
          variant="outline"
          size="sm"
          block={false}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md + 1,
  },
  identity: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    ...type.h3,
    fontSize: 17.2,
    lineHeight: 22,
  },
  specialism: {
    ...type.captionMedium,
    fontSize: 13,
    color: colors.amber,
    marginTop: 3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: spacing.xs,
  },
  meta: {
    ...type.caption,
    flexShrink: 1,
  },
  rating: {
    ...type.captionMedium,
    color: colors.textStrong,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  blurb: {
    ...type.body,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.textBody,
    marginTop: spacing.md,
  },
  actions: {
    flexDirection: "row",
    gap: 9,
    marginTop: spacing.md,
  },
  primaryAction: {
    flex: 1,
  },
});
