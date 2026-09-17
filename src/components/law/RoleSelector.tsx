// Pick which side of the marketplace you are on.
//
// Used in three places — login, signup, and the demo switcher on Account — so
// the wording and semantics of the choice stay identical everywhere. Only the
// selected fill differs: on a white form the choice needs the tint to read,
// while inside the Account panel it sits on grey and reads as white.

import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon, type IconName } from "@/components/ui";
import { colors, radius, spacing, type } from "@/theme";
import type { Role } from "@/types";

interface Option {
  key: Role;
  label: string;
  icon: IconName;
  /** Shown on the auth screens, where the choice has consequences. */
  formHint: string;
  /** Shorter copy for the Account panel, per the design. */
  demoHint: string;
}

const OPTIONS: Option[] = [
  {
    key: "customer",
    label: "Client",
    icon: "nav-account",
    formHint: "Find a lawyer and send requests",
    demoHint: "Find and instruct a lawyer",
  },
  {
    key: "lawyer",
    label: "Lawyer",
    icon: "area-labour",
    formHint: "Take requests and publish posts",
    demoHint: "Take requests and publish",
  },
];

export interface RoleSelectorProps {
  value: Role;
  onChange: (role: Role) => void;
  /** "form" on the auth screens, "demo" inside the Account panel. */
  variant?: "form" | "demo";
}

export function RoleSelector({ value, onChange, variant = "form" }: RoleSelectorProps) {
  const isForm = variant === "form";

  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {OPTIONS.map((option) => {
        const active = value === option.key;
        const hint = isForm ? option.formHint : option.demoHint;

        return (
          <Pressable
            key={option.key}
            onPress={() => onChange(option.key)}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityHint={hint}
            accessibilityState={{ selected: active }}
            style={({ pressed }) => [
              styles.option,
              isForm ? styles.formOption : styles.demoOption,
              {
                borderColor: active || pressed ? colors.ink : colors.border,
                backgroundColor: active
                  ? isForm
                    ? colors.tint
                    : colors.white
                  : isForm
                    ? colors.white
                    : "transparent",
              },
            ]}
          >
            {isForm ? (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: active ? colors.yellow : colors.surface },
                ]}
              >
                <Icon
                  name={option.icon}
                  size={18}
                  color={active ? colors.ink : colors.textMuted}
                  strokeWidth={1.9}
                />
              </View>
            ) : null}
            <Text style={[styles.label, { color: active ? colors.ink : colors.textMuted }]}>
              {option.label}
            </Text>
            <Text
              style={[styles.hint, { color: active ? colors.textBody : colors.textFaint }]}
            >
              {hint}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  option: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.sm,
  },
  formOption: {
    gap: spacing.sm,
    padding: spacing.lg - 2,
  },
  demoOption: {
    gap: 2,
    minHeight: 58,
    justifyContent: "center",
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: 13,
  },
  badge: {
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: radius.sm - 1,
  },
  label: {
    ...type.bodySemi,
    fontSize: 14,
  },
  hint: {
    ...type.micro,
    fontSize: 11.5,
    lineHeight: 15,
  },
});
