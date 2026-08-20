<script lang="ts">
	import { TALENTS } from '$lib/data/card_data';
	import ClickableDiv from './ClickableDiv.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';

	let { values = $bindable([]) }: { values?: string[] } = $props();

	let root: HTMLElement;
	let isExpanded = $state(false);

	function onDocumentClick(event: MouseEvent) {
		// this means the event click and the item that was clicked is not the dropdown list, isExpanded will be closed
		// and the event will still continue to trigger on the item that was clicked
		// No preventDefault / stopPropogation so the click will still progress.
		if (isExpanded && root && !root.contains(event.target as Node)) {
			isExpanded = false;
		}
	}
	function selectTalent(id: string) {
		if (values.includes(id)) {
			values = values.filter((v) => v !== id);
		} else {
			values.push(id);
		}
	}
</script>

<!-- This is equivalent to document.addEventListener('click', onDocumentClick) -->
<svelte:document onclick={onDocumentClick} />

<div bind:this={root} class="dropdown-wrapper">
	<ClickableDiv
		class={`dropdownlist ${isExpanded ? 'expanded' : ''}`}
		onclick={() => {
			isExpanded = !isExpanded;
		}}
	>
		<!-- Display talent name if only 1, more then one will show number of talents. If 0 will show "All talents" -->
		<span
			>{values.length === 0
				? 'All talents'
				: values.length > 1
					? `${values.length} talents`
					: TALENTS.filter((o) => o.id === values[0])[0].en}</span
		>
		{#if isExpanded}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
				<path
					fill="currentColor"
					d="M300.3 199.2C312.9 188.9 331.4 189.7 343.1 201.4L471.1 329.4C480.3 338.6 483 352.3 478 364.3C473 376.3 461.4 384 448.5 384L192.5 384C179.6 384 167.9 376.2 162.9 364.2C157.9 352.2 160.7 338.5 169.9 329.4L297.9 201.4L300.3 199.2z"
				/>
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
				<path
					fill="currentColor"
					d="M300.3 440.8C312.9 451 331.4 450.3 343.1 438.6L471.1 310.6C480.3 301.4 483 287.7 478 275.7C473 263.7 461.4 256 448.5 256L192.5 256C179.6 256 167.9 263.8 162.9 275.8C157.9 287.8 160.7 301.5 169.9 310.6L297.9 438.6L300.3 440.8z"
				/>
			</svg>
		{/if}
	</ClickableDiv>
	{#if isExpanded}
		<div class="dropdown-panel">
			<div class="dropdown-panel-list">
				{#each TALENTS as talent (talent.id)}
					<ClickableDiv
						class={values.includes(talent.id) ? 'dropdown-item active' : 'dropdown-item'}
						onclick={() => {
							selectTalent(talent.id);
						}}
					>
						<Checkbox isChecked={values.includes(talent.id)} />
						{talent.en}</ClickableDiv
					>
				{/each}
			</div>
			<div class="dropdown-desc">
				<div>
					{#if values.length > 0}{values.length} selected -
					{/if}
					{TALENTS.length} talents
				</div>
				<ClickableDiv onclick={() => (values = [])} class="clear-btn">Clear</ClickableDiv>
			</div>
		</div>
	{/if}
</div>
