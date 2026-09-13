<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Card as CardData, OwnedCard } from '$lib/types';

	let { owned, cards, callback }: { owned: OwnedCard[], cards: CardData[]; callback?: (card: CardData) => void } = $props();
</script>

<div class="cards-list">
	{#each cards as card (card.rarity + ' ' + card.nameEn + ' ' + card.number)}
		<Card
			isOwned={owned.filter(o => o.id === `${card.number.toLowerCase()}-${card.rarity.toLowerCase()}-${card.set.toLowerCase()}-${card.nameEn.toLowerCase().includes("post-errata") ? "v2" : "v1"}`).length > 0}
			data={card}
			callback={() => {
				if (callback) {
					card['owned'] = owned.filter(o => o.id === `${card.number.toLowerCase()}-${card.rarity.toLowerCase()}-${card.set.toLowerCase()}-${card.nameEn.toLowerCase().includes("post-errata") ? "v2" : "v1"}`).length > 0; 
					callback(card);
				}
			}}
		/>
	{/each}
</div>

<style>
	.cards-list {
		padding: 1.1rem 1.1rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.8rem;
	}
</style>
