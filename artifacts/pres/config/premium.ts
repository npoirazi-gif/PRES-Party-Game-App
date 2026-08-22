export type PremiumPlan = {
  id: 'monthly' | 'yearly';
  label: string;
  price: string;
  cadence: string;
  value?: string;
};

export type PremiumFeature = {
  id: string;
  icon: string;
  title: string;
  description: string;
  availability: 'available' | 'coming-soon';
};

export type PremiumAccessFeature = 'unhinged' | 'exclusive-games' | 'custom-pres' | 'party-mix';

/**
 * Store billing is intentionally deferred. Flip this only when a verified
 * App Store / Google Play entitlement provider and localized prices are wired.
 */
export const PREMIUM_BILLING_AVAILABLE = false;

export const PREMIUM_PLANS: PremiumPlan[] = [
  { id: 'monthly', label: 'MONTHLY', price: 'Pricing TBC', cadence: '' },
  { id: 'yearly', label: 'YEARLY', price: 'Pricing TBC', cadence: '' },
];

export const PREMIUM_FEATURES: PremiumFeature[] = [
  { id: 'unhinged', icon: 'zap', title: 'UNHINGED MODE', description: 'The wildest questions and prompts in the library.', availability: 'available' },
  { id: 'spicy', icon: 'thermometer', title: 'FULL SPICY LIBRARY', description: 'Every spicy question across all compatible games.', availability: 'coming-soon' },
  { id: 'unlimited', icon: 'repeat', title: 'UNLIMITED QUESTIONS', description: 'Keep the round going for as long as your group wants.', availability: 'coming-soon' },
  { id: 'custom-pres', icon: 'edit-3', title: 'CUSTOM PRES', description: 'Make your own questions, inside jokes and challenges.', availability: 'coming-soon' },
  { id: 'party-mix', icon: 'shuffle', title: 'PARTY MIX', description: 'Let PRES mix the games and keep the night moving.', availability: 'coming-soon' },
  { id: 'smart-vibes', icon: 'compass', title: 'SMART VIBES', description: 'Get recommendations that match the pres you are having.', availability: 'coming-soon' },
  { id: 'exclusive-games', icon: 'star', title: 'EXCLUSIVE GAMES', description: 'First access to special games and future PRES experiences.', availability: 'available' },
  { id: 'ad-free', icon: 'slash', title: 'AD-FREE', description: 'Enjoy PRES without interruptions if ads arrive later.', availability: 'coming-soon' },
];

export const PREMIUM_COMPARISON = {
  free: ['Core games', 'Standard questions', 'Basic vibes', 'Standard game modes'],
  plus: ['Everything in Free', 'Unhinged mode', 'Exclusive games', 'New PRES+ tools as they drop'],
};

export const PREMIUM_PREVIEWS: Record<string, { icon: string; eyebrow: string; title: string; description: string; prompt: string }> = {
  unhinged: {
    icon: 'zap',
    eyebrow: 'UNHINGED MODE',
    title: 'YOU FOUND THE GOOD STUFF.',
    description: 'Unlock PRES+ to access the full Unhinged library.',
    prompt: 'Who here would cause the most chaos if they got famous?',
  },
  'custom-pres': {
    icon: 'edit-3',
    eyebrow: 'CUSTOM PRES',
    title: 'MAKE PRES YOURS.',
    description: 'Create your own questions, inside jokes and challenges with PRES+.',
    prompt: 'Add the question only your group would understand.',
  },
  'party-mix': {
    icon: 'shuffle',
    eyebrow: 'PARTY MIX',
    title: 'LET PRES DECIDE.',
    description: 'Let PRES mix games and keep the night moving.',
    prompt: 'Next up: a game chosen for the mood of your group.',
  },
  'exclusive-games': {
    icon: 'star',
    eyebrow: 'PRES+ GAME',
    title: 'THIS ONE IS FOR PRES+.',
    description: 'Unlock PRES+ to play this exclusive game and get first access to what is next.',
    prompt: 'Your group has entered the good stuff.',
  },
};

export const PREMIUM_GAME_IDS = ['bad-decisions', 'dare-or-drink'];

export function premiumPreviewFor(feature?: string) {
  return PREMIUM_PREVIEWS[feature ?? 'unhinged'] ?? PREMIUM_PREVIEWS.unhinged;
}