// The pill switch used on the notification, availability and accepting-clients
// screens.
//
// This is not react-native's Switch: the design's track is ink rather than the
// platform accent, and the knob travel is specified in points. Drawing it
// ourselves is the only way to match, and it keeps both platforms identical.

import { StyleSheet, View } from "react-native";

import { colors, radius } from "@/theme";

export interface ToggleProps {
  on: boolean;
  /** The design uses a 46x28 track, and a 42x26 one in the week list. */
  size?: "md" | "sm";
}

export function Toggle({ on, size = "md" }: ToggleProps) {
  const track = size === "md" ? { width: 46, height: 28 } : { width: 42, height: 26 };
  const knob = size === "md" ? 22 : 20;
  const inset = 3;

  return (
    <View
      style={[
        styles.track,
        track,
        {
          borderRadius: track.height / 2,
          backgroundColor: on ? colors.ink : colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.knob,
          {
            width: knob,
            height: knob,
            borderRadius: radius.full,
            top: inset,
            left: on ? track.width - knob - inset : inset,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexShrink: 0,
  },
  knob: {
    position: "absolute",
    backgroundColor: colors.white,
  },
});
