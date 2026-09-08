<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Card as CardData } from '$lib/types';

	let { cards }: { cards: CardData[] } = $props();
</script>

<div class="cards-list">
	{#each cards as card (card.rarity + ' ' + card.nameEn + ' ' + card.number)}
		<Card data={card} />
	{/each}
</div>

<style>
	.cards-list {
		padding: 1.1rem 1.1rem 3rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.8rem;
	}
</style>
