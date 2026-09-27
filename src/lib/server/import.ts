import Database from 'better-sqlite3';

type DB = Database.Database;

function isEmpty(db: DB, table: string) {
	return db.prepare(`SELECT NOT EXIST (SELECT 1 FROM ${table})`).pluck().get() === 1;
}

export function importIfEmpty(db: DB) {
    type SetFile = { set: { code: string }; cards: object[] }
    // Get all the files in sets
	const files = import.meta.glob<SetFile>(
		'$lib/data/sets/*.json',
		{
			eager: true,
			import: 'default'
		}
	);
	const sets = Object.fromEntries(Object.values(files).map((file) => [file.set.code, file.cards]));
    console.log(sets);
	// db.transaction(() => {
	// 	if (isEmpty(db, 'sets')) {
	// 		let rows = [];
	// 		const insertStmt = db.prepare(
	// 			'INSERT INTO sets (id, name_jp, name_en, url) VALUES (@id, @name_jp, @name_en, @url)'
	// 		);
	// 		for (const row of rows) insertStmt.run(row);
	// 	}
	// });
}
