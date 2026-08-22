export type CardSkill = {
	name: string;
	text: string;
};

export type CardArt = {
	text: string;
};

export type Card = {
	set: string;
	setLabel: string;
	rarity: string;
	number: string;
	name: string;
	nameEn: string;
	talents: string[];
	colors: string[];
	price: string;
	priceJpy: number;
	stock: string;
	stockCount: number | null;
	inStock: boolean;
	url: string;
	image: string;
	cardType?: string;
	tags?: string[];
	life?: number;
	hp?: number;
	bloomLevel?: string;
	batonPass?: string[];
	oshiSkill?: CardSkill;
	spOshiSkill?: CardSkill;
	arts?: CardArt[];
	abilityText?: string;
	extra?: string;
	officialId?: number;
	officialName?: string;
	officialImage?: string;
	illustrator?: string;
	addedDate?: Date;
};

export type SetInfo = {
	code: string;
	label: string;
	name: string;
	nameEn: string;
	color: string;
	url: string;
};

export type RarityInfo = {
	code: string;
	color: string;
};

export type ColorInfo = {
	code: string;
	jp: string;
	en: string;
	hex: string;
};

export type TalentInfo = {
	id: string;
	en: string;
	jp: string;
};

export type SearchField = 'number' | 'nameEn' | 'rarity';
export type SortField = 'number' | 'nameEn' | 'rarity' | 'addedDate' | 'priceJpy';
