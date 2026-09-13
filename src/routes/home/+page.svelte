<script lang="ts">
	import type { PageData } from './$types';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import { CARDS } from '$lib/data/card_data';
	import CardModal from './CardModal.svelte';
	import type { Card as CardData, CardType, SortField } from '$lib/types';
	import { search } from '$lib/format';
	import Gallery from './Gallery.svelte';
	import DisplayFilter from '$lib/components/DisplayFilter.svelte';

	// INIT
	const PAGE = 99;
	let { data }: { data: PageData } = $props();

	// FILTER
	let q = $state(''); // Search Query
	let r = $state([]); // Filter Rarity
	let t = $state([]); // Filter Talents
	let s = $state([]); // Filter by Set Num
	let ct: CardType = $state("all cards"); // Search Card Type
	let sortBy: SortField = $state('rarity');
	let cardLimit = $state(PAGE);
	let modalOpen = $state(false);

	// States
	let selectedCard: CardData | null = $state(null);

	// Manage Card List
	const cardList = $derived(search(CARDS, data['ownedCards'], { q, r, t, s, ct, sortBy }));
	const cards = $derived(cardList.slice(0, cardLimit));
	const hasMore = $derived(cardLimit < cardList.length);

	$effect(() => {
		if (cardList) {
			cardLimit = PAGE;
		}
	});
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
			bind:cardType={ct}
		/>
		<Gallery
			owned={data['ownedCards']}
			{cards}
			callback={(c) => {
				selectedCard = c;
				modalOpen = true;
			}}
		/>

		<CardModal bind:card={selectedCard} bind:isOpen={modalOpen} />

		{#if hasMore}
			<div class="footer">
				<button
					class="button"
					onclick={() => {
						cardLimit += PAGE;
					}}>Load More</button
				>
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
	.footer {
		margin-top: 1rem;
		display: flex;
		align-items: center;
		gap: 0.9rem;
		justify-content: center;
		white-space: nowrap;
		margin-bottom: 3rem;
	}
	.button {
		padding: 0.7rem 3rem;
		border: 1px solid rgba(0, 0, 0, 0.2);
		font-weight: bold;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(0, 0, 0, 0.7);
		transition: ease 0.5s all;
	}
	.button:hover {
		transform: scale(1.2);
		color: white;
		border-color: #d4883b;
		background-color: #d4883b;
	}
</style>
