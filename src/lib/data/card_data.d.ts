import type { Card, ColorInfo, RarityInfo, SetInfo, TalentInfo } from '../types';

// This is required because of Card_data.js. The number of items in CARDS is too many that it confuses Typescript.
// So we hard code that CARDS is being mapped to the type Card instead so it doesnt need to assume what it is.
export const SETS: SetInfo[];
export const RARITIES: RarityInfo[];
export const COLORS: ColorInfo[];
export const TALENTS: TalentInfo[];
export const CARDS: Card[];
