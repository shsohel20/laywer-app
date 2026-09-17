// The tall portrait card in the Nearby and Popular rails on the home screen.

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/ui";
import { colors, layout, radius, type } from "@/theme";
import type { Lawyer } from "@/types";

export interface LawyerPortraitProps {
  lawyer: Lawyer;
  onPress: () => void;
  /** The Popular rail uses the second portrait where a lawyer has one. */
  useAltPhoto?: boolean;
}

export function LawyerPortrait({ lawyer, onPress, useAltPhoto = false }: LawyerPortraitProps) {
  const source = useAltPhoto ? (lawyer.altPhoto ?? lawyer.photo) : lawyer.photo;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${lawyer.name}, ${lawyer.specialism} in ${lawyer.location}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={source} style={styles.photo} contentFit="cover" transition={150} />
      <LinearGradient
        colors={["rgba(1,2,7,0)", "rgba(1,2,7,0.88)"]}
        style={styles.veil}
        pointerEvents="none"
      />
      <View style={styles.caption}>
        <Text style={styles.name} numberOfLines={1}>
          {lawyer.name}
        </Text>
        <View style={styles.locationRow}>
          <Icon name="send" size={11} color={colors.yellow} strokeWidth={2.4} />
          <Text style={styles.location} numberOfLines={1}>
            {lawyer.location}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: layout.portraitCard.width,
    height: layout.portraitCard.height,
    flexShrink: 0,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.tint,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  veil: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "58%",
  },
  caption: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 11,
  },
  name: {
    ...type.bodySemi,
    fontSize: 14,
    color: colors.white,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },
  location: {
    ...type.caption,
    color: colors.tint,
    flexShrink: 1,
  },
  pressed: {
    opacity: 0.85,
  },
});
