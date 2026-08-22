<script lang="ts">
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import Card from '$lib/components/Card.svelte';
	import FilterRarity from '$lib/components/FilterRarity.svelte';
	import logo from '$lib/assets/favicon.png';
	import { CARDS } from '$lib/data/card_data';
	import { search } from '$lib/format';
	import FilterTalent from '$lib/components/FilterTalent.svelte';
	import DropdownList from '$lib/components/DropdownList.svelte';
	import type { Card as CardData, SortField } from '$lib/types';
	import DisplayFilter from '$lib/components/DisplayFilter.svelte';
	import Modal from '$lib/components/Modal.svelte';

	const PAGE = 99;

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
		<Modal bind:open={modalOpen}>{selectedCard?.nameEn}</Modal>

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
	</div>
{/snippet}
