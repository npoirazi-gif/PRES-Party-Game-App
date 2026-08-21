import React from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import { tokens } from '../../generated/tokens';

const c = tokens.color.dark;

export interface LoserFateCardProps {
  /** Fate title — concise noun phrase (e.g. "Do 10 push-ups"). */
  title: string;
  /** Optional longer description displayed below the title. */
  description?: string;
  /** Sticker image placed on the left side of the card. */
  image?: ImageSourcePropType;
  /** Whether this fate is currently active. */
  enabled?: boolean;
  /** Called when the toggle is pressed. Omit to render without a toggle. */
  onToggle?: (enabled: boolean) => void;
  style?: ViewStyle;
}

/**
 * Dark-surface card used on the Loser's Fate screen. Lays out a sticker
 * image on the left, title + description text in the centre, and an optional
 * toggle on the right.
 *
 * Surface: `tokens.color.dark.muted` (#24106F)
 * Border:  `tokens.color.dark.border` (#2D2169)
 *
 * Usage:
 * ```tsx
 * <LoserFateCard
 *   title="Do 10 push-ups"
 *   description="The loser must complete 10 push-ups right now."
 *   image={require('../assets/pushup.png')}
 *   enabled={isEnabled}
 *   onToggle={setIsEnabled}
 * />
 * ```
 */
export function LoserFateCard({
  title,
  description,
  image,
  enabled = false,
  onToggle,
  style,
}: LoserFateCardProps) {
  return (
    <View style={[styles.card, style]}>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {description ? (
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        ) : null}
      </View>

      {onToggle !== undefined && (
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: c.border, true: c.primary }}
          thumbColor={c.foreground}
          ios_backgroundColor={c.border}
          accessibilityRole="switch"
          accessibilityLabel={`Toggle ${title}`}
          accessibilityState={{ checked: enabled }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: c.muted,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: c.border,
  },
  imageContainer: {
    width: 56,
    height: 56,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontFamily: tokens.fontFamily.sans[0],
    fontSize: 15,
    fontWeight: '700',
    color: c.foreground,
    lineHeight: 20,
  },
  description: {
    fontFamily: tokens.fontFamily.sans[0],
    fontSize: 13,
    color: c.mutedForeground,
    lineHeight: 18,
  },
});
