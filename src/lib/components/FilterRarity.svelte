<script lang="ts">
	import { RARITIES } from '$lib/data/card_data';
	import ClickableDiv from './ClickableDiv.svelte';

	let { value = $bindable([]) }: { value?: string[] } = $props();

	let rarities = $state(
		RARITIES.map((r) => {
			return { label: r.code, isActive: false, color: r.color };
		})
	);
</script>

<div class="rarity-list">
	{#each rarities as r (r.label)}
		<ClickableDiv
			style={`--color: ${r.color};`}
			class={value.includes(r.label) ? 'tag active' : 'tag'}
			onclick={() => {
				if (value.includes(r.label)) {
					value = value.filter((v) => v !== r.label);
					return;
				}
				value.push(r.label);
				if (value.length === rarities.length) value = [];
			}}><div>{r.label}</div></ClickableDiv
		>
	{/each}
</div>

<style>
	.rarity-list {
		display: flex;
		gap: var(--gap);
		flex-wrap: wrap;
	}
</style>
