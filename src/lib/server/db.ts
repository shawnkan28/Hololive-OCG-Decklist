import Database from 'better-sqlite3';

// Auto creates datafile if it doesnt exist. this probably means root folder data not the src folder data.
const db = new Database('data/data.sqlite');

// Settings
db.pragma('journal_mode = WAL'); // Allow changes to be cached and only written to file after awhile.
db.pragma('foreign_keys = ON'); // Without this you could say, add a card to a deck that doesn't exist. This one has to be set for every connection.
db.pragma('busy_timeout = 5000'); // If database is locked by another write, wait up to 5 seconds instead of falling immediately.
db.pragma('synchronous = NORMAL'); // writes to disk less often. Its safe with WAL. A sudden power loss can lose the last few weites but never corrupts the file.

// Create Tables if is new File
db.exec(`
-- Sets Table - ID is the set code
CREATE TABLE IF NOT EXISTS sets (
    id TEXT PRIMARY KEY,
    name_jp TEXT NOT NULL,
    name_en TEXT NOT NULL,
    url TEXT
);

-- Rarities Table - ID is the rarity code
CREATE TABLE IF NOT EXISTS rarities (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL,
    sort_order INTEGER NOT NULL UNIQUE
);

-- Colors Table - id is the text of the color
CREATE TABLE IF NOT EXISTS colors (
    id TEXT PRIMARY KEY,
    sort_order INTEGER NOT NULL UNIQUE
);

-- Talents Table - ID is the short name of the talent
CREATE TABLE IF NOT EXISTS talents (
    id TEXT PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_jp TEXT NOT NULL
);

-- Card Table - ID is just numbers because card number is not unique
CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    set_id TEXT NOT NULL,
    rarity TEXT NOT NULL,
    card_number TEXT NOT NULL,
    name_jp TEXT NOT NULL,
    name_en TEXT NOT NULL,
    url_yyt TEXT NOT NULL,
    url_img TEXT NOT NULL,
    card_type TEXT NOT NULL,
    official_name TEXT,
    FOREIGN KEY (rarity) REFERENCES rarities(id) ON DELETE RESTRICT,
    FOREIGN KEY (set_id) REFERENCES sets(id) ON DELETE RESTRICT
); 

-- Card Color Middle Table
CREATE TABLE IF NOT EXISTS card_colors (
    card_id INTEGER NOT NULL,
    color_id TEXT NOT NULL,
    PRIMARY KEY (card_id, color_id),
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE CASCADE
);

-- Card Talents Middle Table
CREATE TABLE IF NOT EXISTS card_talents (
    card_id INTEGER NOT NULL,
    talent_id TEXT NOT NULL,
    PRIMARY KEY (card_id, talent_id),
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
    FOREIGN KEY (talent_id) REFERENCES talents(id) ON DELETE CASCADE
);
`);

export default db;
