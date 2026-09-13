<script lang="ts">
	import logo from '$lib/assets/favicon.png';
	import Fa from 'svelte-fa';
	import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
	import DropdownList from '$lib/components/DropdownList.svelte';
	import type { SortField } from '$lib/types';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Input from '$lib/components/Input.svelte';

	let {
		query = $bindable(''),
		sort = $bindable('rarity'),
		searchEnter
	}: { query?: string; sort?: SortField; searchEnter?: () => void } = $props();
	let searchInput = $state<ReturnType<typeof Input> | null>(null);

	// 'number' | 'nameEn' | 'rarity' | 'addedDate';
	const sortList = [
		{ label: 'Set & number', value: 'number' },
		{ label: 'Name', value: 'nameEn' },
		{ label: 'Rarity', value: 'rarity' }
	];

	export function focusSearch() {
		searchInput?.focus();
	}
</script>

<div class="navbar">
	<div class="inner">
		<!-- LOGO -->
		<button
			class="title"
			onclick={() => {
				goto(resolve('/home'));
			}}
		>
			<img src={logo} alt="hololive OCG" width="30" height="30" />
			<div>Hololive OCG</div>
			<div class="desc">Card Browser</div>
		</button>
		<!-- Search Bar -->
		<div style="display: flex; gap: var(--gap); align-items: center;">
			<Input
				bind:this={searchInput}
				onenter={searchEnter}
				id="global-search"
				variant="global"
				bind:value={query}
				type="text"
				autocomplete="off"
				placeholder="Search decks, oshi, cards..."
			>
				{@render searchIcon()}
			</Input>
			<DropdownList bind:value={sort} elements={sortList} />
		</div>
	</div>
</div>

{#snippet searchIcon()}
	<button
		onclick={() => {
			if (query !== '') query = '';
		}}
	>
		{#if query === ''}
			<Fa icon={faSearch} />
		{:else}
			<Fa icon={faTimes} />
		{/if}
	</button>
{/snippet}

<style>
	.navbar {
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(14px);
		top: 0;
		z-index: 50;
	}

	.navbar .inner {
		padding: 0.7rem 1.1rem;
		margin: 0 auto;
		display: flex;
		gap: var(--gap);
		justify-content: space-between;
		align-items: center;
	}

	.navbar .inner .title {
		font-size: 0.95rem;
		color: var(--color-neutral-dark);
		font-weight: bolder;
		display: flex;
		gap: var(--gap);
		align-items: center;
	}

	.navbar .inner .title img {
		border-radius: 7px;
		-webkit-user-drag: none;
		user-select: none;
	}
</style>
