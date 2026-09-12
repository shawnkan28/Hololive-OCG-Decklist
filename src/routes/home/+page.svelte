<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import { CARDS } from '$lib/data/card_data';
	import type { Card as CardData, SortField } from '$lib/types';
	import { search } from '$lib/format';
	import Gallery from './Gallery.svelte';
	import DisplayFilter from '$lib/components/DisplayFilter.svelte';

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
	<div class="scroll-section">
		<DisplayFilter
			total={CARDS.length}
			bind:rarity={r}
			numFiltered={cardList.length}
			bind:search={q}
			bind:talents={t}
		/>
		<Gallery {cards} />
		{#if hasMore}
			<div class="footer">
				<div class="line"></div>
				<button
					onclick={() => {
						cardLimit += PAGE;
					}}>Load More</button
				>
				<div class="line"></div>
			</div>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		flex: 1;
		display: flex;
		min-height: 0;
	}
	.scroll-section {
		flex: 1;
		overflow-y: scroll;
	}
</style>
