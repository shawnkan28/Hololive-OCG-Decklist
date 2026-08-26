<script lang="ts">
	// import Fa from 'svelte-fa';
	// import { faFlag } from '@fortawesome/free-solid-svg-icons';
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import Card from '$lib/components/Card.svelte';
	import FilterRarity from '$lib/components/FilterRarity.svelte';
	import logo from '$lib/assets/favicon.png';
	import { CARDS, SETS } from '$lib/data/card_data';
	import { lookupRarity, search } from '$lib/format';
	import FilterTalent from '$lib/components/FilterTalent.svelte';
	import DropdownList from '$lib/components/DropdownList.svelte';
	import type { Card as CardData, SortField } from '$lib/types';
	import DisplayFilter from '$lib/components/DisplayFilter.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import MultiDropdown from '$lib/components/MultiDropdown.svelte';

	const PAGE = 99;
	// TODO:
	//  - Create Filter for SET NUMBER
	//  - Save Inventory Details in a JSON file
	//  - Buttons should be re organized. new class for buttons for clickable buttons.
	//  - Make Clickable Div a button instead. Because i'm getting tired of using global css for Clickable Div.
	//  - This button css will be blank. so by default buttons should be without any styling but when applying clickable button css it will have.
	let query = $state('');
	let rarity = $state([]);
	let talents = $state([]);
	let sort: SortField = $state('rarity');
	let cardLimit = $state(PAGE);
	let selectedCard: CardData | null = $state(null);
	let modalOpen = $state(false);

	const cardList = $derived(search(CARDS, { q: query, r: rarity, t: talents, sortBy: sort }));
	const cards = $derived(cardList.slice(0, cardLimit));
	const hasMore = $derived(cardLimit < cardList.length);

	// 'number' | 'nameEn' | 'rarity' | 'addedDate';
	const sortList = [
		{ label: 'Set & number', value: 'number' },
		{ label: 'Name', value: 'nameEn' },
		{ label: 'Rarity', value: 'rarity' }
	];

	function clearSearch() {
		query = '';
	}
</script>

<!-- ######################################################################################## -->
<!-- CORE CODE -->
<!-- ######################################################################################## -->
{@render navbar()}
<div class="content">
	<!-- FILTER SIDEBAR -->
	{@render FilterSidebar()}
	{@render mainContent()}
</div>

{#snippet navbar()}
	<div class="navbar">
		<div class="inner">
			<!-- Whole Clickable Div si the title and icon  -->
			<ClickableDiv class="title" onclick={() => {}}>
				<img src={logo} alt="hololive OCG" width="30" height="30" />
				<div>Hololive OCG</div>
				<div class="desc">Card Browser</div>
			</ClickableDiv>
			<!-- Other content like the searchbar and filter goes here. -->
			<div style="display: flex; gap: var(--gap); align-items: center;">
				<div class="search">
					<input
						type="text"
						id="search"
						name="search"
						autocomplete="off"
						placeholder="Search decks, oshi, cards..."
						bind:value={query}
					/>
					{@render searchIcon()}
				</div>
				<DropdownList bind:value={sort} elements={sortList} />
			</div>
		</div>
	</div>
{/snippet}

{#snippet searchIcon()}
	<ClickableDiv onclick={clearSearch} class="wrapper">
		{#if query === ''}
			<!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<path
					fill="currentColor"
					d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
				/>
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
				<path
					fill="currentColor"
					d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
				/>
			</svg>
		{/if}
	</ClickableDiv>
{/snippet}

{#snippet mainContent()}
	<div class="main-content">
		<!-- Display all the filtered values -->
		<DisplayFilter
			total={CARDS.length}
			bind:rarity
			numFiltered={cardList.length}
			bind:search={query}
			bind:talents
		/>
		<!-- CARD Gallery -->
		<div class="card-list">
			{#each cards as card (card.rarity + ' ' + card.nameEn + ' ' + card.number)}
				<Card
					data={card}
					callback={() => {
						selectedCard = card;
						modalOpen = true;
					}}
				/>
			{/each}
		</div>
		<!-- Card Details Modal -->
		{@render cardModal()}
		<!-- LOAD MORE CARDS Button -->
		<div class="footer">
			{#if hasMore}
				<div style="display: flex; justify-content: center; gap: 30px; align-items: center;">
					<div class="line"></div>
					<ClickableDiv
						class="button"
						onclick={() => {
							cardLimit += PAGE;
						}}>LOAD MORE</ClickableDiv
					>
					<div class="line"></div>
				</div>
			{/if}
		</div>
	</div>
{/snippet}

{#snippet FilterSidebar()}
	<div class="sidebar">
		<div class="label">
			Filters <div class="line"></div>
		</div>
		<div class="sub-label">
			<span>RARITY</span>
			{#if rarity.length > 0}
				<ClickableDiv
					onclick={() => {
						rarity = [];
					}}
					class="clickable">Clear</ClickableDiv
				>
			{/if}
		</div>
		<FilterRarity bind:value={rarity} />
		<div class="sub-label" style="margin-top: var(--gap);">TALENT</div>
		<FilterTalent bind:values={talents} />
		<div class="sub-label" style="margin-top: var(--gap);">SET NUMBER</div>
		<MultiDropdown elements={SETS.map((s) => ({ label: s.label, value: s.code }))} />
	</div>
{/snippet}

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
	.modal-content img {
		aspect-ratio: 100 / 140;
		object-fit: contain;
		border-radius: 7px;
		width: 108px;
	}
	.modal-content .info-section {
		display: flex;
		padding-right: 2.5rem;
		gap: 1rem;
		padding-bottom: 1.05rem;
		border-bottom: 1px solid var(--color-neutral-soft);
	}
	.modal-content .card-form {
		margin-top: 0.95rem;
	}
	.card-form label {
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.09rem;
		color: var(--color-neutral-mid);
	}
	.card-form div:has(label) {
		margin-bottom: 0.32rem;
	}
	.card-form .card-row {
		display: flex;
		gap: var(--gap);
	}
	.card-row > div {
		flex: 1;
	}
</style>
