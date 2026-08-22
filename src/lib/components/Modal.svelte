<script lang="ts">
	import type { Snippet } from 'svelte';

	let { open = $bindable(false), children }: { open: boolean; children: Snippet } = $props();
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (!dialog) return;
		if (open) {
			if (!dialog.open) dialog.showModal();
		} else if (dialog.open) {
			dialog.close();
		}
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => {
		open = false;
	}}
	onclick={() => {}}
>
	{@render children()}
</dialog>
