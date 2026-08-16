export type Card = {
    url: string;
    number: string;
    nameEn: string;
    image: string;
    set: string;
    colors: string[];
    stockCount: number | null;
    rarity: string;
};

export type SearchField = 'number' | 'nameEn' | 'rarity';