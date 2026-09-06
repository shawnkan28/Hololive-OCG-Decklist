<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
	import Checkbox from './Checkbox.svelte';

	interface Element {
		label: string;
		sublabel: string;
		value: string;
	}

	let {
		values = $bindable([]),
		elements,
		defaultText = 'elements',
		placeholder = 'Find element'
	}: {
		values?: string[];
		elements: Element[];
		defaultText: string;
		placeholder: string;
	} = $props();

	let root: HTMLElement;
	let isExpanded = $state(false);
	let searchText = $state('');

	function onDocumentClick(event: MouseEvent) {
		if (isExpanded && root && !root.contains(event.target as Node)) {
			isExpanded = false;
		}
	}

	function selectValue(id: string) {
		if (values.includes(id)) {
			values = values.filter((v) => v !== id);
		} else {
			values.push(id);
		}
	}
</script>

<svelte:document onclick={onDocumentClick} />

<div bind:this={root} class="wrapper">
	<button
		class={isExpanded ? 'dropdown expanded' : 'dropdown'}
		onclick={() => {
			isExpanded = !isExpanded;
		}}
	>
		<!-- Display talent name if only 1, more then one will show number of talents. If 0 will show "All talents" -->
		<span>
			{values.length === 0
				? `All ${defaultText}s`
				: values.length > 1
					? `${values.length} ${defaultText}s`
					: elements.filter((e) => e.value === values[0])[0].label}
		</span>
		{#if isExpanded}
			<Fa icon={faCaretUp} />
		{:else}
			<Fa icon={faCaretDown} />
		{/if}
	</button>
	{#if isExpanded}
		<div class="g-dropdown-panel">
			<div>
				<input type="text" {placeholder} bind:value={searchText} />
			</div>
			<div class="g-dropdown-panel-list">
				{#each elements.filter((e) => e.label
						.toLowerCase()
						.includes(searchText)) as element (element.value)}
					<button
						class="element"
						onclick={() => {
							selectValue(element.value);
						}}
					>
						<span class="labels">
							<Checkbox isChecked={values.includes(element.value)} />
							<span class="text">{element.label}</span>
						</span>
						<span class="sublabel">{element.sublabel}</span>
					</button>
				{/each}
			</div>
			<div class="panel-desc">
				<div>
					{#if values.length > 0}{values.length} selected -
					{/if}{elements.length}
					{defaultText}s
				</div>
				<button
					class="clear"
					onclick={() => {
						values = [];
					}}
				>
					Clear
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.clear {
		padding: 0.2rem;
		transition: 0.2s ease all;
		font-size: 0.75rem;
		color: inherit;
	}
	.clear:hover {
		color: var(--color-main-dark-0);
	}
	.wrapper {
		position: relative;
	}
	.dropdown {
		border: 1px solid var(--color-neutral-soft);
		background: white;
		padding: 0.45rem 0.7rem;
		border-radius: 7px;
		font-size: 0.75rem;
		color: var(--color-neutral-mid);
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: all ease 0.1s;
	}
	.dropdown.expanded {
		box-shadow: 0 0 0 3px var(--color-main-light-0);
		border-color: var(--color-main);
	}

	.wrapper :global(svg) {
		width: 0.8rem;
		height: 0.8rem;
	}
	.element {
		box-sizing: border-box;
		display: flex;
		gap: var(--gap);
		align-items: center;
		padding: 0.34rem 0.45rem;
		font-size: 0.75rem;
		margin-right: 0.2rem;
	}
	.element:hover {
		background-color: var(--color-neutral-soft-1);
		border-radius: 7px;
	}
	.element .labels {
		flex: 1;
		display: flex;
		gap: var(--gap);
		align-items: center;
		min-width: 0;
	}
	.element .labels .text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.element .sublabel {
		font-size: 0.72rem;
		white-space: nowrap;
		color: var(--color-neutral-mid-1);
	}
	.panel-desc {
		padding-top: 0.4rem;
		border-top: 1px solid var(--color-neutral-soft);
		color: var(--color-neutral-mid);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/* #################################################################################################### */
	/* INPUT SEARCH FIELD */
	/* #################################################################################################### */
	input {
		background: var(--color-neutral-soft-1);
		padding: 0.38rem 0.6rem;
		border-radius: 7px;
		border: 1px solid var(--color-neutral-soft);
		width: 100%;
		color: var(--color-neutral-dark);
	}
</style>
