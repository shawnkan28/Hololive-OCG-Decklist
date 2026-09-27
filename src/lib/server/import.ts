import Database from 'better-sqlite3';

type DB = Database.Database;

function isEmpty(db:DB, table:string){
    return db.prepare(`SELECT NOT EXIST (SELECT 1 FROM ${table})`).pluck().get() === 1 ;
}

export function importIfEmpty(db:DB){
    db.transaction(() => {
        if(isEmpty(db, 'sets')){
            let rows = [];
            const insertStmt = db.prepare('INSERT INTO sets (id, name_jp, name_en, url) VALUES (@id, @name_jp, @name_en, @url)');
            for (const row of rows) insertStmt.run(row);
        }
    })

}