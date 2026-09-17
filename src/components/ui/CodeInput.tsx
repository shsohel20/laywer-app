// Segmented one-time-code entry.
//
// The boxes are presentational; a single transparent TextInput sits over them
// and owns the value. That is the only way to get one caret, working paste and
// SMS autofill — six separate inputs break all three.

import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius, spacing, type } from "@/theme";

export interface CodeInputProps {
  value: string;
  onChangeText: (value: string) => void;
  length?: number;
  /** Called once the final digit is entered. */
  onComplete?: (value: string) => void;
}

export function CodeInput({ value, onChangeText, length = 6, onComplete }: CodeInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);

  const handleChange = (next: string) => {
    const digits = next.replace(/\D/g, "").slice(0, length);
    onChangeText(digits);
    if (digits.length === length) onComplete?.(digits);
  };

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      accessibilityRole="none"
      style={styles.row}
    >
      {Array.from({ length }).map((_, index) => {
        const digit = value[index];
        // The caret box is the first empty one while the field has focus.
        const active = focused && index === Math.min(value.length, length - 1);

        return (
          <View
            key={index}
            style={[
              styles.box,
              digit ? styles.boxFilled : null,
              active ? styles.boxActive : null,
            ]}
          >
            <Text style={styles.digit}>{digit ?? ""}</Text>
          </View>
        );
      })}

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="number-pad"
        inputMode="numeric"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        maxLength={length}
        accessibilityLabel={`${length}-digit verification code`}
        style={styles.hiddenInput}
        caretHidden
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm + 2,
  },
  box: {
    flex: 1,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
  },
  boxFilled: {
    borderColor: colors.ink,
  },
  boxActive: {
    borderColor: colors.ink,
    backgroundColor: colors.tint,
  },
  digit: {
    ...type.h3,
    fontSize: 22,
    letterSpacing: 0,
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    // Keeps the native caret and selection handles off-screen on Android.
    color: "transparent",
  },
});
