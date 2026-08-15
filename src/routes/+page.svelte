<script lang="ts">
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import logo from '$lib/assets/favicon.png';
	import { CARDS } from '$lib/data/card_data';
	import { withCommas, colorToHex } from '$lib/format';
</script>

{@render navbar()}

<div class="content">
	<div class="card-list">
		{#each CARDS.slice(400, 500) as card (card.rarity + ' ' + card.name + ' ' + card.number)}
			{@render cardEntry(card)}
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

{#snippet cardEntry(card: {
	url: string;
	number: string;
	nameEn: string;
	image: string;
	priceJpy: number;
	colors: string[];
	stockCount: number | null;
})}
	<ClickableDiv
		style={colorToHex(card.colors)
			.map((c, i) => {
				return `--color${i}: ${c};`;
			})
			.join(' ')}
		class={colorToHex(card.colors).length > 1 ? 'card dual' : 'card tinted'}
		onclick={() => {
			window.location.href = card.url;
		}}
	>
		<div class="img-wrapper"><img src={card.image} alt={card.number} /></div>
		<div class="card-details">
			<div class="set-num">{card.number}</div>
			<div class="card-name">{card.nameEn}</div>
			<div class="prices">
				<span>¥{withCommas(card.priceJpy)}</span><span
					class={card.stockCount ? 'stock in' : 'stock out'}
					>{card.stockCount ? `${card.stockCount} in stock` : 'Sold out'}</span
				>
			</div>
		</div>
	</ClickableDiv>
{/snippet}

<style>
	/* .content { } */
</style>
