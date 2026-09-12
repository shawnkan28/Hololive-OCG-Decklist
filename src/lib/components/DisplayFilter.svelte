<script lang="ts">
	import { RARITIES } from '$lib/data/card_data';
	import Fa from 'svelte-fa';
	import { faTimes } from '@fortawesome/free-solid-svg-icons';

	let {
		total = 0,
		rarity = $bindable([]),
		search = $bindable(''),
		talents = $bindable([]),
		numFiltered = 0
	}: {
		total?: number;
		rarity?: string[];
		numFiltered?: number;
		search?: string;
		talents?: string[];
	} = $props();

	function clearAll() {
		rarity = [];
		search = '';
		talents = [];
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

	<!-- Searched Value -->
	{#if search !== ''}
		{@render tag(`"${search}"`, 'var(--color-main)', () => {
			search = '';
		})}
	{/if}

	<!-- Rarities Filtered -->
	{@render displayRarities()}

	<!-- Talents Filtered -->
	{@render displayTalent()}

	<!-- Clear all button to clear all filters -->
	{#if numFiltered !== total}
		<button onclick={clearAll} class="clear-btn">Clear All</button>
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
<!-- DISPLAY TALENTS TAGS -->
<!-- ######################################################################################## -->
{#snippet displayTalent()}
	{#if talents.length < 5}
		{#each talents as t (t)}
			{@render tag(t, 'var(--color-main)', () => {
				talents = talents.filter((talent) => talent !== t);
			})}
		{/each}
	{:else}
		<!-- Consolidate list of rarities if it gets more then 5 -->
		{@render tag(`${talents.length} talents`, 'var(--color-main)', () => {
			talents = [];
		})}
	{/if}
{/snippet}

<!-- ######################################################################################## -->
<!-- Reusable for all the rest -->
<!-- ######################################################################################## -->
{#snippet tag(displayVal: string, color: string, callback: () => void)}
	<button class="tag active" style={`--color: ${color};`} onclick={callback}>
		<div>
			{displayVal}
		</div>
		<Fa icon={faTimes} />
	</button>
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
	.clear-btn {
		transition: all ease 0.2s;
		font-size: 0.8rem;
	}
	.clear-btn:hover {
		color: var(--color-main);
	}
</style>
