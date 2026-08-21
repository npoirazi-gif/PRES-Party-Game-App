import { dsColor, dsRadius } from '@/constants/ds';

/**
 * Returns the PRES design-system colour tokens plus the base radius.
 *
 * The app always uses the dark PRES palette; dsColor is the single source
 * of truth sourced from @workspace/pres-design-system/tokens so any
 * palette update propagates here automatically.
 */
export function useColors() {
  return { ...dsColor, radius: dsRadius };
}
