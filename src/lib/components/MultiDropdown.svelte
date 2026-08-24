<script lang="ts">
	let { values = $bindable([]), elements }: { values?: string[]; elements: string[] } = $props();

	let root: HTMLElement;
	let isExpanded = $state(false);
	let searchText = $state('');

	function onDocumentClick(event: MouseEvent) {
		if (isExpanded && root && !root.contains(event.target as Node)) {
			isExpanded = false;
		}
	}
</script>

<svelte:document onclick={onDocumentClick} />

<div bind:this={root}>
	<button>
		<!-- Display talent name if only 1, more then one will show number of talents. If 0 will show "All talents" -->
		{values}
	</button>
</div>

<style>
	button {
		border: none;
		background: white;
	}
</style>
