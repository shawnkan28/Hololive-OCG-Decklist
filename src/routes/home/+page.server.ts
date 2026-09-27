import type { PageServerLoad, Actions } from './$types';
import type { OwnedCard } from '$lib/types';
import path from 'node:path';
import fs from 'node:fs/promises';
import db from '$lib/server/db';

const filePath = path.resolve('data/app.json');

export const load: PageServerLoad = async () => {
	const d = db.prepare("select * from cards").all();
	console.log(d);
	// const users = db.prepare('SELECT id, name FROM users').all();

	const emptyJson = { ownedCards: [] };
	const fileHandle = await fs.open(filePath, 'a+');

	try {
		const content = await fileHandle.readFile('utf-8');
		// Empty File
		if (!content.trim()) {
			console.warn(`Path: ${filePath}, no data found.`);
			return { carddata: emptyJson };
		} else {
			// console.log(`Path: ${filePath}, sending data to client.`);
			return { carddata: JSON.parse(content.trim()), users: [] };
		}
	} catch (err) {
		console.error(err);
		return { carddata: emptyJson };
	} finally {
		await fileHandle.close();
	}
};

export const actions: Actions = {
	updateCollection: async ({ request }) => {
		const formData = await request.formData();
		const identifier = formData.get('identifier')?.toString();
		const owned = formData.get('owned')?.toString();
		const quantity = Number(formData.get('quantity') ?? '0');
		const location = formData.get('location')?.toString();

		const fileContent = await fs.readFile(filePath, 'utf-8');
		let jData: { ownedCards: OwnedCard[] };
		if (!fileContent.trim()) {
			jData = { ownedCards: [] };
		} else {
			jData = JSON.parse(fileContent);
		}

		// Add Owned
		if (owned === 'Owned') {
			const alrOwned = jData['ownedCards'].filter((i) => i.id === identifier).length > 0;
			if (!alrOwned && identifier) {
				jData['ownedCards'].push({ id: identifier, qty: quantity, location: location });
			}
		}
		// Remove Owned
		else {
			jData['ownedCards'] = jData['ownedCards'].filter((i) => i.id !== identifier);
		}
		console.log(jData);
		await fs.writeFile(filePath, JSON.stringify(jData, null, 2), 'utf-8');
	}
};
