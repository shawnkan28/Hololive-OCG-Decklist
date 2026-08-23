<script lang="ts">
	import type { Snippet } from 'svelte';

	let { open = $bindable(false), children }: { open: boolean; children: Snippet } = $props();
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (open) dialog?.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => {
		open = false;
	}}
	// What this does is, when background is clicked, it will run the onclose() instructions.
	// Why we use e.target === dialog is because the background is part of the dialog. Those inside the dialog
	// is considered not part of the dialog. So its opposite of a backdrop.
	onclick={(e: MouseEvent) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		{@render children()}
		<button
			onclick={() => {
				dialog?.close();
			}}
		>
			Close
		</button>
	</div>
</dialog>

<style>
	dialog {
		padding: 0;
	}
</style>
