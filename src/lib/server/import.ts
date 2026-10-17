import Database from 'better-sqlite3';
import metaData from '$lib/data/meta.json';
import appData from '../../../data/app.json';

type DB = Database.Database;

function isEmpty(db: DB, table: string) {
	return db.prepare(`SELECT NOT EXISTS (SELECT 1 FROM ${table})`).pluck().get() === 1;
}

function insertAll(db: DB, stmt: string, data: object[]) {
	const insertStmt = db.prepare(stmt);
	for (const row of data) insertStmt.run(row);
}

export function importIfEmpty(db: DB) {
	type Card = {
		set: string;
		setLabel: string;
		rarity: string;
		name: string;
		nameEn: string;
		talents: string[];
		colors: string[];
		url: string;
		image: string;
		cardType: string;
		officialName: string;
	};
	type Set = {
		code: string;
		label: string;
		name: string;
		nameEn: string;
		color: string;
		url: string;
	};
	type SetFile = {
		set: Set;
		cards: Card[];
	};
	// Get all the files in sets
	const files = import.meta.glob<SetFile>('$lib/data/sets/*.json', {
		eager: true,
		import: 'default'
	});

	// Get Data
	const cards = new Map(Object.values(files).map((file) => [file.set.code, file.cards]));
	const talents = metaData.talents;
	const colors = metaData.colors;
	const rarities = metaData.rarities;
	const sets = metaData.sets;

	db.transaction(() => {
		if (isEmpty(db, 'sets')) {
			insertAll(
				db,
				'INSERT INTO sets (id, name_jp, name_en, url) VALUES (@code, @name, @nameEn, @url)',
				sets
			);
		}
		if (isEmpty(db, 'rarities')) {
			insertAll(
				db,
				'INSERT INTO rarities (id, name_en, sort_order) VALUES (@code, @name, @id)',
				rarities
			);
		}
		if (isEmpty(db, 'colors')) {
			insertAll(db, 'INSERT INTO colors (id, sort_order) VALUES (@code, @order)', colors);
		}
		if (isEmpty(db, 'talents')) {
			insertAll(db, 'INSERT INTO talents (id, name_en, name_jp) VALUES (@id, @en, @jp)', talents);
		}
		if (isEmpty(db, 'cards')) {
			const setList = [...cards.keys()];
			for (const setName of setList) {
				const cardList = cards.get(setName);
				if (cardList) {
					insertAll(
						db,
						'INSERT INTO cards (set_id, rarity, card_number, name_jp, name_en, url_yyt, url_img, card_type) VALUES (@set, @rarity, @number, @name, @nameEn, @url, @image, @cardType)',
						cardList
					);
				}
			}
		}
			// IMPORT APP DATA
	type Owned = {
		card_id: number;
		is_owned: boolean;
		qty: number;
		loc: string;
	}
	const data = appData.ownedCards;
	const parsed: Owned[] = data.map(d => {
		return {
			card_id: "",
			is_owned: false,
			qty: 0,
			loc: ""
		}
	});	
	if (isEmpty(db, 'card_owned')) {
			insertAll(
				db, 
				'INSERT INTO card_owned (card_id, is_owned, qty, loc) VALUES (@card_id, @is_owned, @qty, @loc)', 
				parsed
			);
		}
	});
}