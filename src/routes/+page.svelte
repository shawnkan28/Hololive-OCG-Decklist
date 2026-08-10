<script lang="ts">
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import logo from '$lib/assets/favicon.png';
	import { CARDS } from '$lib/data/card_data';
</script>

{@render navbar()}

<div class="content">
	<div class="card-list">
		{#each CARDS as card (card.rarity + ' ' + card.name + ' ' + card.number)}
			{@render cardList(card)}
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
			<div style="flex: 1;"></div>
		</div>
	</div>
{/snippet}

{#snippet cardList(card: {
	url: string;
	number: string;
	name: string;
	image: string;
	priceJpy: number;
	stockCount: number | null;
})}
	<ClickableDiv
		class="card"
		onclick={() => {
			window.location.href = card.url;
		}}
	>
		<img src={card.image} alt={card.number} />
		<div class="card-details">
			<div class="set-num">{card.number}</div>
			<div class="card-name">{card.name}</div>
		</div>
		<div class="prices"><span>{card.priceJpy}</span><span>{card.stockCount} in stock</span></div>
	</ClickableDiv>
{/snippet}

<style>
	/* .content { } */
</style>
