import type { PageServerLoad, Actions } from './$types';
import type { OwnedCard } from '$lib/types';
import path from 'node:path';
import fs from 'node:fs/promises';

const filePath = path.resolve('src/lib/data/app.json');

export const load: PageServerLoad = async () => {
	const emptyJson = { ownedCards: [] };
	const fileHandle = await fs.open(filePath, 'a+');

	try {
		const content = await fileHandle.readFile('utf-8');
		// Empty File
		if (!content.trim()) {
			console.warn(`Path: ${filePath}, no data found.`);
			return emptyJson;
		} else {
			console.log(`Path: ${filePath}, sending data to client.`);
			return JSON.parse(content.trim());
		}
		// const fileContent = await fs.readFile(filePath, 'utf-8');
		// return JSON.parse(fileContent);
	} catch (err) {
		console.error(err);
		return {};
	} finally {
		await fileHandle.close();
	}
};

export const actions: Actions = {
	updateCollection: async ({ request }) => {
		const formData = await request.formData();
		const identifier = formData.get('identifier')?.toString();
		const owned = formData.get('owned')?.toString();

		const fileContent = await fs.readFile(filePath, 'utf-8');
		const jData: { ownedCards: OwnedCard[] } = JSON.parse(fileContent);

		// Add Owned
		if (owned === 'Owned') {
			const alrOwned = jData['ownedCards'].filter((i) => i.id === identifier).length > 0;
			if (!alrOwned && identifier) {
				jData['ownedCards'].push({ id: identifier });
			}
		} 
		// Remove Owned
		else {
			jData['ownedCards'] = jData['ownedCards'].filter(i => i.id !== identifier);
		}

		await fs.writeFile(filePath, JSON.stringify(jData, null, 2), 'utf-8');
	}
};
