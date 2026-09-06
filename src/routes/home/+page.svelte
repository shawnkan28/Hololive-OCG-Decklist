<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import { CARDS } from '$lib/data/card_data';
	import Card from '$lib/components/Card.svelte';
	import type { SortField } from '$lib/types';
	import { search } from '$lib/format';

	const PAGE = 99;

	// FILTER
	let q = $state(''); // Search Query
	let r = $state([]); // Filter Rarity
	let t = $state([]); // Filter Talents
	let s = $state([]); // Filter by Set Num
	let sortBy: SortField = $state('rarity');
	let cardLimit = $state(PAGE);

	// States
	let selectedCard: CardData | null = $state(null);

	// Manage Card List
	const cardList = $derived(search(CARDS, { q, r, t, s, sortBy }));
	const cards = $derived(cardList.slice(0, cardLimit));
	const hasMore = $derived(cardLimit < cardList.length);
</script>

<Navbar bind:query={q} bind:sort={sortBy} />
<div class="wrapper">
	<Sidebar bind:rarity={r} bind:talents={t} bind:setNum={s} />
	{@render gallery()}
</div>

{#snippet gallery()}
	<!-- CARD Gallery -->
	<div class="gallery">
		<div class="cards-list">
			{#each cards as card (card.rarity + ' ' + card.nameEn + ' ' + card.number)}
				<Card data={card} />
			{/each}
		</div>
	</div>
{/snippet}

<style>
	.wrapper {
		flex: 1;
		display: flex;
		min-height: 0;
	}
	.gallery {
		flex: 1;
		overflow-y: scroll;
	}
	.cards-list {
		padding: 1.1rem 1.1rem 3rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.8rem;
	}
</style>
