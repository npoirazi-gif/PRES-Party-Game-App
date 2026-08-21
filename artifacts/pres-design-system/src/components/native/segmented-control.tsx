import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { tokens } from '../../generated/tokens';

const c = tokens.color.dark;

export type RoundLength = 'short' | 'medium' | 'long';

export interface SegmentedControlProps {
  /** Currently selected segment. */
  value: RoundLength;
  /** Called when the user selects a different segment. */
  onChange: (value: RoundLength) => void;
  style?: ViewStyle;
}

const SEGMENTS: { value: RoundLength; label: string }[] = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
];

const TRACK_RADIUS = 8;
const SEGMENT_RADIUS = TRACK_RADIUS - 2; // 6px — sits flush inside the track

/**
 * Round-length picker with three fixed segments: Short / Medium / Long.
 *
 * The active segment is a white pill with a subtle shadow; inactive segments
 * show muted text on the dark track surface.
 *
 * Usage:
 * ```tsx
 * const [length, setLength] = React.useState<RoundLength>('medium');
 *
 * <SegmentedControl value={length} onChange={setLength} />
 * ```
 */
export function SegmentedControl({ value, onChange, style }: SegmentedControlProps) {
  return (
    <View style={[styles.track, style]} accessibilityRole="radiogroup">
      {SEGMENTS.map((seg) => {
        const active = seg.value === value;
        return (
          <Pressable
            key={seg.value}
            onPress={() => onChange(seg.value)}
            style={[styles.segment, active && styles.segmentActive]}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={seg.label}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {seg.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: c.muted,
    borderRadius: TRACK_RADIUS,
    padding: 3,
    gap: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SEGMENT_RADIUS,
  },
  segmentActive: {
    // Active segment uses the light palette's card token (#FFFFFF) so it
    // reads as a bright white pill over the muted dark track.
    backgroundColor: tokens.color.light.card,
    shadowColor: c.background,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontFamily: tokens.fontFamily.sans[0],
    fontSize: 14,
    fontWeight: '600',
    color: c.mutedForeground,
  },
  labelActive: {
    // Active text uses background colour so it reads as deep indigo on white.
    color: c.background,
  },
});
