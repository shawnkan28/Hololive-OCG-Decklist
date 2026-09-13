<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCaretUp, faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';

	type Element = {
		label: string;
		value: string;
	};

	let {
		value = $bindable(),
		elements = [
			{ label: 'label1', value: 'value1' },
			{ label: 'label2', value: 'value2' }
		]
	}: { value: string; elements?: Element[] } = $props();
	let isExpanded = $state(false);
	let root: HTMLElement;

	function onDocumentClick(event: MouseEvent) {
		if (isExpanded && root && !root.contains(event.target as Node)) {
			isExpanded = false;
		}
	}
</script>

<!-- This is equivalent to document.addEventListener('click', onDocumentClick) -->
<svelte:document onclick={onDocumentClick} />

<div bind:this={root} class="wrapper">
	<button
		class={isExpanded ? 'dropdown expanded' : 'dropdown'}
		onclick={() => (isExpanded = !isExpanded)}
	>
		<span style="line-height: 1; color: black;">{elements.filter((e) => e.value === value)[0]?.label ?? ""}</span>
		{#if isExpanded}
			<Fa icon={faCaretUp} />
		{:else}
			<Fa icon={faCaretDown} />
		{/if}
	</button>
	{#if isExpanded}
		<div class="g-dropdown-panel">
			<div class="g-dropdown-panel-list">
				{#each elements as element (element.value)}
					<button
						class={element.value === value ? 'element active' : 'element'}
						onclick={() => {
							value = element.value;
							isExpanded = !isExpanded;
						}}
					>
						<div>{element.label}</div>
						{#if element.value === value}
							<div>
								<Fa icon={faCheck} />
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
		min-width: 170px;
	}

	.dropdown {
		padding: 0.45rem 0.7rem;
		border: 1px solid color-mix(in srgb, var(--color-neutral-dark) 25%, #fff);
		background: white;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--color-neutral-mid);
		width: 100%;
		transition: ease 0.1s all;
	}
	.dropdown.expanded {
		box-shadow: 0 0 0 3px var(--color-main-light-0);
		border-color: var(--color-main);
		color: var(--color-main);
	}
	.element {
		font-size: 0.75rem;
		box-sizing: border-box;
		display: flex;
		gap: var(--gap);
		align-items: center;
		padding: 0.44rem 0.55rem;
		margin-right: 0.2rem;
		border-radius: 3px;
		justify-content: space-between;
		margin-bottom: 0.1rem;
	}
	.element.active {
		background: color-mix(in srgb, var(--color-main) 20%, #fff 100%);
		color: var(--color-main-dark-1);
		font-weight: 600;
	}
	.element:hover:not(.active) {
		background-color: var(--color-neutral-soft-1);
	}
</style>
