<script lang="ts">
	import FilterRarity from '$lib/components/FilterRarity.svelte';
	import MultiDropdown from '$lib/components/MultiDropdown.svelte';
	import { SETS, TALENTS } from '$lib/data/card_data';

	let {
		rarity = $bindable([]),
		talents = $bindable([]),
		setNum = $bindable([])
	}: { rarity?: string[]; talents?: string[]; setNum?: string[] } = $props();
</script>

<div class="wrapper">
	<div class="labels">
		Filters <div class="line"></div>
	</div>
	<div class="sub-labels">
		<span>RARITY</span>
		{#if rarity.length > 0}
			<button
				class="clear"
				onclick={() => {
					rarity = [];
				}}
			>
				Clear
			</button>
		{/if}
	</div>
	<FilterRarity bind:value={rarity} />
	<div class="sub-labels" style="margin-top: var(--gap);">TALENT</div>
	<MultiDropdown
		bind:values={talents}
		placeholder="Find talent - mumei, fauna, ina..."
		defaultText="talent"
		elements={TALENTS.map((t) => ({ label: t.en, value: t.id, sublabel: t.jp }))}
	/>
	<div class="sub-labels" style="margin-top: var(--gap);">SET NUMBER</div>
	<MultiDropdown
		bind:values={setNum}
		placeholder="Find set - hbp01, Diva Fever ... "
		defaultText="set number"
		elements={SETS.map((s) => ({ label: s.nameEn, value: s.code, sublabel: s.label }))}
	/>
</div>

<style>
	.wrapper {
		width: 300px;
		background: rgba(255, 255, 255, 0.6);
		padding: 1rem 0.95rem 1.6rem 1.1rem;
		overflow-y: scroll;
		scrollbar-color: auto;
		scrollbar-width: auto;
	}

	.wrapper::-webkit-scrollbar {
		width: 6.5px;
	}
	.wrapper::-webkit-scrollbar-track {
		background: transparent;
	}
	.wrapper::-webkit-scrollbar-thumb {
		background: var(--color-neutral-soft);
		border-radius: 999px;
	}
	.wrapper::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}

	/* #################################################################################################### */
	/* Labels */
	/* #################################################################################################### */
	.labels {
		display: flex;
		gap: 10px;
		align-items: center;
		color: rgba(0, 0, 0, 0.7);
		font-weight: bold;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}
	.labels .line {
		color: rgba(0, 0, 0, 0.4);
	}
	.sub-labels {
		color: rgba(0, 0, 0, 0.7);
		font-weight: 800;
		font-size: 0.7rem;
		margin-bottom: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.clear {
		font-size: 0.7rem;
		color: rgba(0, 0, 0, 0.7);
		font-weight: 500;
		transition: all ease 0.2s;
	}
	.clear:hover {
		color: var(--color-main);
	}
</style>
