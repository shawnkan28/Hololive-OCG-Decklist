<script lang="ts">
	import { tick } from 'svelte';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import { CARDS } from '$lib/data/card_data';
	import CardModal from './CardModal.svelte';
	import type { Card as CardData, CardType, SortField, OwnedCard } from '$lib/types';
	import { getIdentifier, search } from '$lib/format';
	import Gallery from './Gallery.svelte';
	import DisplayFilter from '$lib/components/DisplayFilter.svelte';

	// INIT
	const PAGE = 99;
	let { data }: { data: { ownedCards: OwnedCard[] } } = $props();

	// FILTER
	let q = $state(''); // Search Query
	let r = $state([]); // Filter Rarity
	let t = $state([]); // Filter Talents
	let s = $state([]); // Filter by Set Num
	let ct: CardType = $state('all cards'); // Search Card Type
	let sortBy: SortField = $state('rarity');
	let cardLimit = $state(PAGE);
	let modalOpen = $state(false);

	// States
	let selectedCard: CardData | null = $state(null);
	let navBarComponent = $state<ReturnType<typeof Navbar> | null>(null);

	// Manage Card List
	const cardList = $derived(search(CARDS, data['ownedCards'], { q, r, t, s, ct, sortBy }));
	const cards = $derived(cardList.slice(0, cardLimit));
	const hasMore = $derived(cardLimit < cardList.length);

	$effect(() => {
		if (q || r || t || s || ct || sortBy) {
			cardLimit = PAGE;
		}
	});

	function handleKeyDown(e: KeyboardEvent) {
		const target = e.target as HTMLElement | null;
		// Check if typing into a proper text field
		const isTyping =
			target &&
			(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

		if (e.key === 'Enter' && !isTyping) {
			e.preventDefault();
			handleModal('enter');
		} else if (e.key === 'Escape' && !isTyping) {
			e.preventDefault();
			handleModal('esc');
		}
	}
	// Handle Modal when opening with Enter key press
	function handleModal(type: 'enter' | 'esc') {
		if (cards.length === 0) return;

		// modal closed and attempt to open
		if (!modalOpen && type === 'enter') {
			const cardId = getIdentifier(cards[0]);
			const ownedCard = data['ownedCards'].filter((d) => d.id === cardId);

			selectedCard = cards[0];
			selectedCard.owned = true;
			selectedCard.qty = ownedCard.length > 0 ? ownedCard[0].qty : 0;
			selectedCard.location = ownedCard.length > 0 ? ownedCard[0].location : '';
			modalOpen = true;
		}
		// modal is Open and attempt to save and close
		// modal is open and attempt to close without saving
		else if (modalOpen) {
			modalOpen = false;
			// Wait for DOM to destroy CardModal completely
			tick().then(() => {
				navBarComponent?.focusSearch();
			});
		}
	}
</script>

<!-- Event Handler for key press -->
<svelte:window onkeydown={handleKeyDown} />

<Navbar
	bind:query={q}
	bind:sort={sortBy}
	bind:this={navBarComponent}
	searchEnter={() => handleModal('enter')}
	searchEscape={() => console.log('ESC Press')}
/>
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
				const cardId = getIdentifier(c);
				const ownedCard = data['ownedCards'].filter((d) => d.id === cardId);

				selectedCard = c;
				selectedCard.qty = ownedCard.length > 0 ? ownedCard[0].qty : 0;
				selectedCard.location = ownedCard.length > 0 ? ownedCard[0].location : '';
				modalOpen = true;
			}}
		/>

		<CardModal
			modalEnter={() => handleModal('enter')}
			modalEscape={() => handleModal('esc')}
			bind:card={selectedCard}
			bind:isOpen={modalOpen}
		/>

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
