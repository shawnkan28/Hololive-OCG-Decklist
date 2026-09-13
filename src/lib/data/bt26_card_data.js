export const SET = {
	code: 'bt26',
	label: 'BT26',
	name: 'TIMELESS BONDS',
	nameEn: 'TIMELESS BONDS',
	url: 'https://yuyu-tei.jp/sell/digi/s/bt26'
};

const CARD_IMAGE_URL = 'https://card.yuyu-tei.jp/digi/100_140/bt26';
const CARD_URL = 'https://yuyu-tei.jp/sell/digi/card/bt26';

const CARD_BLOCK =
	/<a\s+href="https:\/\/yuyu-tei\.jp\/sell\/digi\/card\/bt26\/(\d+)"[\s\S]*?<img\s+src="(https:\/\/card\.yuyu-tei\.jp\/digi\/100_140\/bt26\/\1\.jpg)" alt="BT26-\d{3} ([^"]+)"[\s\S]*?<span[\s\S]*?>(BT26-\d{3})<\/span>[\s\S]*?<h4[^>]*>([^<]+)<\/h4>[\s\S]*?<strong[^>]*>\s*([^<]+?)\s*<\/strong>[\s\S]*?<label[^>]*>[\s\S]*?在庫\s*:\s*([^<]+)<\/label>/g;

function parseCard(cardData = []) {
	const id = cardData[0];
	const image = cardData[1];
	const altName = cardData[2];
	const number = cardData[3];
	const name = cardData[4];
	const price = cardData[5];
	const stock = cardData[6];
	const rarity = altName.match(/^([^ ]+) /)?.[1] ?? '';
	const stockLabel = stock.trim();
	const stockCount = Number(stockLabel.match(/^\d+/)?.[0] ?? 0);

	return {
		set: SET.code,
		setLabel: SET.label,
		rarity,
		number,
		name,
		nameEn: name,
		price: price.trim(),
		stock: stockLabel,
		stockCount,
		inStock: stockLabel !== '×',
		url: `${CARD_URL}/${id}`,
		image: image || `${CARD_IMAGE_URL}/${id}.jpg`
	};
}

export function parseCards(html = '') {
	return [...html.matchAll(CARD_BLOCK)].map((match) => parseCard(match.slice(1)));
}

export async function loadCards(fetcher = fetch) {
	const response = await fetcher(SET.url);
	if (!response.ok) {
		throw new Error(`Unable to load ${SET.label}: ${response.status} ${response.statusText}`);
	}

	return parseCards(await response.text());
}

export const CARDS = await loadCards();
