<script lang="ts">
	import ClickableDiv from './ClickableDiv.svelte';
	import { RARITIES } from '$lib/data/card_data';

	let {
		total = 0,
		rarity = $bindable([]),
		search = $bindable(''),
		numFiltered = 0
	}: { total?: number; rarity?: string[]; numFiltered?: number; search?: string } = $props();

	function clearAll() {
		rarity = [];
	}
	function removeRarity(value: string) {
		rarity = rarity.filter((r) => r !== value);
	}
</script>

<!-- ######################################################################################## -->
<!-- CORE CODE -->
<!-- ######################################################################################## -->
<div class="filtered-vals">
	<!-- Show total number of cards and number filtered -->
	<div>
		<span style="font-weight: 700; color: var(--color-neutral-dark);">
			{numFiltered === total ? total : numFiltered}
		</span>
		{#if numFiltered !== total}
			of {total}
		{/if}
		cards
	</div>
	<!-- Show total number of cards and number filtered -->
	{#if search !== ''}
		{@render tag(`"${search}"`, 'var(--color-main)', () => {
			search = '';
		})}
	{/if}

	{@render displayRarities()}
	<!-- Clear all button to clear all filters -->
	{#if numFiltered !== total}
		<ClickableDiv
			onclick={clearAll}
			class="clickable"
			style="font-size: 0.8rem; align-self: center; line-height: 1;"
			>Clear All
		</ClickableDiv>
	{/if}
</div>

<!-- ######################################################################################## -->
<!-- DISPLAY RARITY TAGS -->
<!-- ######################################################################################## -->
{#snippet displayRarities()}
	{#if rarity.length < 5}
		{#each rarity as r (r)}
			{@render tag(r, RARITIES.filter((rare) => rare.code === r)[0].color, () => {
				removeRarity(r);
			})}
		{/each}
	{:else}
		<!-- Consolidate list of rarities if it gets more then 5 -->
		{@render tag(`${rarity.length} rarities`, 'var(--color-main)', () => {
			rarity = [];
		})}
	{/if}
{/snippet}

<!-- ######################################################################################## -->
<!-- Reusable for all the rest -->
<!-- ######################################################################################## -->
{#snippet tag(displayVal: string, color: string, callback: () => void)}
	<ClickableDiv
		onclick={callback}
		class="tag active"
		style={`--color: ${color}; display: flex; gap: 0.3rem; font-size: 0.7rem; align-items: center;`}
	>
		{displayVal}
		<div style="width: 0.7rem; height: 0.7rem; padding-top: 0.8px;">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
				<path
					fill="currentColor"
					d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
				/>
			</svg>
		</div>
	</ClickableDiv>
{/snippet}

<style>
	.filtered-vals {
		display: flex;
		gap: var(--gap);
		color: var(--color-neutral-mid);
		font-size: 0.9rem;
		margin: 0.5rem 1.1rem 0rem;
		padding-bottom: 0.5rem;
		padding-left: 0.2rem;
		border-bottom: 1px solid color-mix(in srgb, var(--color-neutral-mid) 50%, #fff);
	}
</style>
