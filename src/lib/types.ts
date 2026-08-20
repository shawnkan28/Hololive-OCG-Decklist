export type Card = {
    url: string;
    number: string;
    nameEn: string;
    image: string;
    set: string;
    colors: string[];
    stockCount: number | null;
    rarity: string;
    addedDate?: Date;
    talents: string[];
};

export type SearchField = 'number' | 'nameEn' | 'rarity';
export type SortField = 'number' | 'nameEn' | 'rarity' | 'addedDate'