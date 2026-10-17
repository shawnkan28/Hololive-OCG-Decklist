import type { PageServerLoad, Actions } from './$types';
// import type { OwnedCard } from '$lib/types';
// import path from 'node:path';
// import fs from 'node:fs/promises';
import db from '$lib/server/db';

// const filePath = path.resolve('data/app.json');

export const load: PageServerLoad = async () => {
	const d = db.prepare('select * from cards').all();

	const emptyJson = { ownedCards: [] };
	try {
		// Empty File
		if (d.length === 0) {
			console.warn(`Datasource SQLite is empty.`);
			return { carddata: emptyJson };
		} else {
			return { carddata: { ownedCards: d }, users: [] };
		}
	} catch (err) {
		console.error(err);
		return { carddata: emptyJson };
	}
};

export const actions: Actions = {
	updateCollection: async ({ request }) => {
		const formData = await request.formData();
		const identifier = formData.get('identifier')?.toString();
		const owned = formData.get('owned')?.toString();
		const quantity = Number(formData.get('quantity') ?? '0');
		const location = formData.get('location')?.toString();

		console.log(identifier);
		console.log(owned);
		console.log(quantity);
		console.log(location);

		// const fileContent = await fs.readFile(filePath, 'utf-8');
		// let jData: { ownedCards: OwnedCard[] };
		// if (!fileContent.trim()) {
		// 	jData = { ownedCards: [] };
		// } else {
		// 	jData = JSON.parse(fileContent);
		// }

		// // Add Owned
		// if (owned === 'Owned') {
		// 	const alrOwned = jData['ownedCards'].filter((i) => i.id === identifier).length > 0;
		// 	if (!alrOwned && identifier) {
		// 		jData['ownedCards'].push({ id: identifier, qty: quantity, location: location });
		// 	}
		// }
		// // Remove Owned
		// else {
		// 	jData['ownedCards'] = jData['ownedCards'].filter((i) => i.id !== identifier);
		// }
		// console.log(jData);
		// await fs.writeFile(filePath, JSON.stringify(jData, null, 2), 'utf-8');
	}
};
