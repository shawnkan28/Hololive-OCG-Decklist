import { COLORS, RARITIES, SETS } from '$lib/data/card_data';
import type { Card, CardType, RarityInfo, SearchField, SortField, OwnedCard } from '$lib/types';

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

export function search(
	list: Card[],
	ownedList: OwnedCard[],
	options: {
		ct: CardType;
		q?: string;
		r?: string[];
		t?: string[];
		s?: string[];
		searchCol?: SearchField[];
		sortBy?: SortField;
	}
): Card[] {
	interface IdentifiedCard extends Card {
		identifier?: string;
	}

	const searchCol = options.searchCol ?? ['number', 'nameEn', 'rarity'];
	const sortBy = options.sortBy ?? 'number';

	const q = options.q?.toLowerCase() ?? '';

	let filtered: IdentifiedCard[] = list.filter((c) =>
		searchCol.some((key) => c[key].toLowerCase().includes(q))
	);
	filtered = filtered.map((c) => ({
		...c,
		identifier: `${c.number.toLowerCase()}-${c.rarity.toLowerCase()}-${c.set.toLowerCase()}-${c.nameEn.toLowerCase().includes('post-errata') ? 'v2' : 'v1'}`
	}));
	// Card Type
	if (options.ct !== 'all cards') {
		filtered = filtered.filter(
			(c) =>
				(options.ct === 'missing' && ownedList.filter((o) => o.id === c.identifier).length === 0) ||
				(options.ct === 'owned' && ownedList.filter((o) => o.id === c.identifier).length > 0)
		);
	}
	// Rarity
	if (options.r && options.r.length > 0) {
		filtered = filtered.filter((c) =>
			options.r?.some((r) => r.toLowerCase() === c['rarity'].toLowerCase())
		);
	}
	// Talent
	if (options.t && options.t.length > 0) {
		filtered = filtered.filter((c) => options.t?.some((t) => c['talents'].includes(t)));
	}
	// Set Number
	if (options.s && options.s.length > 0) {
		filtered = filtered.filter((c) =>
			options.s?.some((s) => c['set'].toLowerCase() === s.toLowerCase())
		);
	}

	return filtered.sort((a: Card, b: Card) => {
		// Rarity we sort by the id
		if (sortBy === 'rarity') {
			const aObj: RarityInfo = RARITIES.filter((r) => r.code === a.rarity)[0];
			const bObj: RarityInfo = RARITIES.filter((r) => r.code === b.rarity)[0];
			return bObj.id - aObj.id;
		}

		// Sort By Date
		if (a[sortBy] instanceof Date && b[sortBy] instanceof Date) {
			return a[sortBy].getTime() - b[sortBy].getTime();
		}
		// Sort by Number columns
		if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
			return a[sortBy] - b[sortBy];
		}
		// Sort by string columnss
		if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
			return a[sortBy].localeCompare(b[sortBy]);
		}

		return 0;
	});
}

export function getIdentifier(card: Card){
	return `${card.number.toLowerCase()}-${card.rarity.toLowerCase()}-${card.set.toLowerCase()}-${card.nameEn.toLowerCase().includes("post-errata") ? "v2" : "v1"}`;
}