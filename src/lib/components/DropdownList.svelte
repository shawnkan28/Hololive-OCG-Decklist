<script lang="ts">
	import ClickableDiv from './ClickableDiv.svelte';
	let { value = $bindable() }: { value: string } = $props();
	let isExpanded = $state(false);
</script>

<div class="dropdown-wrapper">
	<ClickableDiv class={`dropdownlist ${isExpanded ? 'expanded' : ''}`} onclick={() => {}}>
		<span>{value}</span>
	</ClickableDiv>
</div>

<style></style>
