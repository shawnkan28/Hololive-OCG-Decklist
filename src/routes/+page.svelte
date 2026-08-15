<script lang="ts">
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import logo from '$lib/assets/favicon.png';
	import { CARDS } from '$lib/data/card_data';
	import Card from '$lib/components/Card.svelte';

	let query = $state('');
	// Add Filter for all importat strings.
	// - number
	// - nameEn
	// - rarity
	let cards = $derived(
		CARDS.filter((obj) => obj.nameEn.toLowerCase().includes(query.toLowerCase()))
	);
</script>

{@render navbar()}

<div class="content">
	<div class="card-list">
		{#each cards
			.slice(0, 100)
			.sort( (a: { number: string }, b: { number: string }) => a.number.localeCompare(b.number) ) as card (card.rarity + ' ' + card.name + ' ' + card.number)}
			<Card data={card} />
		{/each}
	</div>
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
			<div>
				<div class="search">
					<input
						type="text"
						id="search"
						name="search"
						autocomplete="off"
						placeholder="Search decks, oshi, cards..."
						bind:value={query}
					/>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
						><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path
							d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
						/></svg
					>
				</div>
			</div>
		</div>
	</div>
{/snippet}
