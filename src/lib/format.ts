import { COLORS, RARITIES, SETS } from '$lib/data/card_data';

const COLOR_HEX = new Map<string, string>();
for (const color of COLORS) {
	COLOR_HEX.set(color.code.toLowerCase(), color.hex);
	COLOR_HEX.set(color.en.toLowerCase(), color.hex);
	COLOR_HEX.set(color.jp, color.hex);
}

const RARITY_OBJ = new Map<string, string>();
for (const rarity of RARITIES) {
	RARITY_OBJ.set(rarity.code, rarity.color);
}

const SET_HEX = new Map<string, string>();
for (const set of SETS) {
	SET_HEX.set(set.code, set.color);
}

export function lookupSet(name: string): string | undefined {
	const key = name.trim();
	return SET_HEX.get(key);
}

function lookupHex(name: string): string | undefined {
	const key = name.trim();
	return COLOR_HEX.get(key.toLowerCase()) ?? COLOR_HEX.get(key);
}

export function lookupRarity(name: string): string | undefined {
	const key = name.trim();
	return RARITY_OBJ.get(key.toUpperCase()) ?? RARITY_OBJ.get(key);
}

/** Map color names (`code` / English / Japanese) to hex. `["red", "blue"]` → `["#e23d3d", "#3c82d8"]`. */
export function colorToHex(names: string[]): string[] {
	return names.map(lookupHex).filter((hex): hex is string => hex != null);
}

/** Group a numeric string with commas: "29800" → "29,800". */
export function withCommas(value: number | string): string {
	const raw = String(value).trim();
	const match = raw.match(/^(-?)(\d+)(?:\.(\d+))?$/);
	if (!match) return raw;

	const [, sign, whole, fraction] = match;
	const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return fraction == null ? `${sign}${grouped}` : `${sign}${grouped}.${fraction}`;
}