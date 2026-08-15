<script lang="ts">
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import logo from '$lib/assets/favicon.png';
	import { CARDS } from '$lib/data/card_data';
	import Card from '$lib/components/Card.svelte';
</script>

{@render navbar()}

<div class="content">
	<div class="card-list">
		{#each CARDS.slice(400, 500) as card (card.rarity + ' ' + card.name + ' ' + card.number)}
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
			<div style="flex: 1;"></div>
		</div>
	</div>
{/snippet}
