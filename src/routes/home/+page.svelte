<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { CARDS } from '$lib/data/card_data';
	import type { Card as CardData, SortField } from '$lib/types';
	import { lookupRarity, search } from '$lib/format';
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
	let modalOpen = $state(false);

	// States
	let selectedCard: CardData | null = $state(null);

	// Manage Card List
	const cardList = $derived(search(CARDS, { q, r, t, s, sortBy }));
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
		/>
		<Gallery {cards} callback={(c) => {
			selectedCard = c;
			modalOpen = true;
		}}/>
		{@render cardModal()}
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

{#snippet cardModal()}
	<Modal bind:open={modalOpen}>
		{#if selectedCard}
			<div class="modal-content">
				<!-- MODAL DETAILS -->
				<div class="info-section">
					<img src={selectedCard.image} alt={selectedCard.number} />
					<div style="display: flex; flex-direction: column; gap: 0.3rem;">
						<span
							style="font-size: 0.72rem; color: var(--color-neutral-mid); font-family: Consolas, monospace;"
							>{selectedCard.number}</span
						>
						<span
							style="line-height: 1; font-size: 1.02rem; font-weight: 700; text-transform: uppercase;"
							>{selectedCard.nameEn}</span
						>
						<div style="display: flex; gap: var(--gap); margin-top: 2px;">
							<div class="tag active" style={`--color: ${lookupRarity(selectedCard.rarity)}`}>
								{selectedCard.rarity}
							</div>
							<div
								class="tag active"
								style="--color: var(--color-main); text-transform: uppercase;"
							>
								{selectedCard.set}
							</div>
						</div>
						<div style="display: flex;">
							<a href={selectedCard.url} rel="external">View on Yuyutei</a>
						</div>
					</div>
				</div>
				<!-- MODAL FORM -->
				<div class="card-form">
					<div class="card-row">
						<div>
							<div><label for="qty">QUANTITY</label></div>
							<Input id="qty" type="text" placeholder="0" />
						</div>
						<div>
							<div><label for="loc">LOCATION</label></div>
							<Input id="loc" type="text" placeholder="Binder, box, sleeve ..." />
						</div>
					</div>
					<div class="card-row">
						<div>
							<div><label for="bprice">BOUGHT PRICE</label></div>
							<Input id="bprice" type="text" placeholder="¥" />
						</div>
						<div>
							<div><label for="sprice">SOLD PRICE</label></div>
							<Input id="sprice" type="text" placeholder="¥" />
						</div>
					</div>
					<div>
						<div><label for="mprice">MARKET PRICE</label></div>
						<Input id="mprice" type="text" placeholder="¥" />
					</div>
					<div style="text-align: right; margin-top: 25px;">
						<button class="button" onclick={() => {}}>Save</button>
					</div>
				</div>
			</div>
		{/if}
	</Modal>
{/snippet}

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
