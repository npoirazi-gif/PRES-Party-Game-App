import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import { tokens } from '../../generated/tokens';

const c = tokens.color.dark;

export interface GameCardProps {
  /** Card title shown below the artwork. */
  title: string;
  /** Optional artwork PNG/image source. */
  artwork?: ImageSourcePropType;
  /** Optional player count — rendered as a pill badge. */
  playerCount?: number;
  style?: ViewStyle;
}

/**
 * White sticker-style game card with an artwork slot, title, and optional
 * player-count badge. Renders as a elevated white panel that floats over
 * the dark app background.
 *
 * Usage:
 * ```tsx
 * <GameCard
 *   title="Chaos Mode"
 *   artwork={require('../assets/chaos.png')}
 *   playerCount={6}
 * />
 * ```
 */
export function GameCard({ title, artwork, playerCount, style }: GameCardProps) {
  return (
    <View style={[styles.card, style]}>
      {artwork && (
        <View style={styles.artworkContainer}>
          <Image source={artwork} style={styles.artwork} resizeMode="contain" />
        </View>
      )}

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      {playerCount !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{playerCount} players</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // White sticker surface — uses the light palette's card token (#FFFFFF)
    backgroundColor: tokens.color.light.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: c.background,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
    minWidth: 140,
    maxWidth: 200,
  },
  artworkContainer: {
    width: 96,
    height: 96,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artwork: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: tokens.fontFamily.sans[0],
    fontSize: 15,
    fontWeight: '700',
    // Card uses white background — use the dark palette's background as text colour
    // so it reads as near-black indigo on white.
    color: c.background,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: c.primary,
    borderRadius: 99,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontFamily: tokens.fontFamily.sans[0],
    fontSize: 12,
    fontWeight: '600',
    color: c.primaryForeground,
  },
});
