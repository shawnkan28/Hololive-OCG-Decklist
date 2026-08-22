<script lang="ts">
	import ClickableDiv from './ClickableDiv.svelte';

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

<div bind:this={root} class="dropdown-wrapper" style="min-width: 150px;">
	<ClickableDiv
		class={`dropdownlist ${isExpanded ? 'expanded' : ''}`}
		onclick={() => (isExpanded = !isExpanded)}
	>
		<span>{elements.filter((e) => e.value === value)[0].label}</span>
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
				{#each elements as element (element.value)}
					<ClickableDiv
						class="dropdown-item"
						style="display: flex; justify-content: space-between; align-items: center"
						onclick={() => {
							value = element.value;
							isExpanded = !isExpanded;
						}}
					>
						<div>{element.label}</div>
						{#if element.value === value}
							<div style="color: black; width: 1rem; height: 1rem;">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
									<!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
									<path
										fill="currentColor"
										d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"
									/>
								</svg>
							</div>
						{/if}
					</ClickableDiv>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style></style>
