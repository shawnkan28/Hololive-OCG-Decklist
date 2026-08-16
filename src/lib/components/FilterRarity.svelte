<script lang="ts">
	import { RARITIES } from '$lib/data/card_data';

	let rarities = $state(
		RARITIES.map((r) => {
			return { label: r.code, isActive: false };
		})
	);
</script>

<div class="rarity-list">
	{#each rarities as r (r.label)}
		<div class="tag">{r.label}</div>
	{/each}
</div>

<style>
    .rarity-list {
        display: flex;
        gap: var(--gap);
        flex-wrap: wrap;
    }
</style>