import { tokens } from '@workspace/pres-design-system/tokens';

// tokens.radius   = '1rem'    (CSS string — must parse to px for React Native)
// tokens.spacing  = '0.25rem' (CSS string)
// tokens.fontFamily.sans[0] = 'Inter'
const BASE_PX = 16;
const rem = (r: string) => parseFloat(r) * BASE_PX;

/** Always the dark PRES palette. */
export const dsColor = tokens.color.dark;

/** 16 px — matches legacy cornerRadius constant. */
export const dsRadius = rem(tokens.radius); // 16

/** 4 px base spacing unit. */
export const dsSpacing = rem(tokens.spacing); // 4

/** Primary font family string. */
export const dsFontFamily = tokens.fontFamily.sans[0]; // 'Inter'
