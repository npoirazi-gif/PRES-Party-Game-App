import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { tokens } from '../../generated/tokens';

const c = tokens.color.dark;

export type PillButtonVariant = 'coral' | 'violet' | 'outline';

export interface PillButtonProps {
  /** Button label text. */
  label: string;
  onPress: () => void;
  /** Visual style. Defaults to 'coral'. */
  variant?: PillButtonVariant;
  /** Stretch to fill the parent's width. */
  fullWidth?: boolean;
  disabled?: boolean;
  /** Shows a spinner and disables interaction. */
  loading?: boolean;
}

/**
 * Primary pill-shaped call-to-action button.
 *
 * Variants:
 *  - `coral`   — filled with `tokens.color.dark.primary` (#FF6B4A)
 *  - `violet`  — filled with `tokens.color.dark.secondary` (#5328FC)
 *  - `outline` — transparent with a coral border
 */
export function PillButton({
  label,
  onPress,
  variant = 'coral',
  fullWidth = false,
  disabled = false,
  loading = false,
}: PillButtonProps) {
  const containerStyles: ViewStyle[] = [
    styles.base,
    variant === 'coral' ? styles.coral : variant === 'violet' ? styles.violet : styles.outline,
    fullWidth ? styles.fullWidth : undefined,
    disabled || loading ? styles.disabled : undefined,
  ].filter(Boolean) as ViewStyle[];

  const labelStyle: TextStyle =
    variant === 'coral'
      ? styles.coralLabel
      : variant === 'violet'
        ? styles.violetLabel
        : styles.outlineLabel;

  const spinnerColor =
    variant === 'outline' ? c.primary : (c.primaryForeground as string);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [...containerStyles, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 99,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 52,
  },
  coral: {
    backgroundColor: c.primary,
  },
  violet: {
    backgroundColor: c.secondary,
  },
  outline: {
    borderWidth: 2,
    borderColor: c.primary,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontFamily: tokens.fontFamily.sans[0],
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  coralLabel: {
    color: c.primaryForeground,
  },
  violetLabel: {
    color: c.secondaryForeground,
  },
  outlineLabel: {
    color: c.primary,
  },
});
