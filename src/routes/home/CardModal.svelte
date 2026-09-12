<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { Card as cardData } from '$lib/types';
	import { lookupRarity } from '$lib/format';

	let { card = $bindable(), isOpen = $bindable() }: { card?: cardData | null; isOpen: boolean } =
		$props();
</script>

<Modal bind:open={isOpen}>
	{#if card}
		<div class="modal-content">
			<!-- MODAL DETAILS -->
			<div class="info-section">
				<img src={card.image} alt={card.number} />
				<div style="display: flex; flex-direction: column; gap: 0.3rem;">
					<span
						style="font-size: 0.72rem; color: var(--color-neutral-mid); font-family: Consolas, monospace;"
						>{card.number}</span
					>
					<span
						style="line-height: 1; font-size: 1.02rem; font-weight: 700; text-transform: uppercase;"
						>{card.nameEn}</span
					>
					<div style="display: flex; gap: var(--gap); margin-top: 2px;">
						<div class="tag active" style={`--color: ${lookupRarity(card.rarity)}`}>
							{card.rarity}
						</div>
						<div class="tag active" style="--color: var(--color-main); text-transform: uppercase;">
							{card.set}
						</div>
					</div>
					<div style="display: flex;">
						<a href={card.url} rel="external">View on Yuyutei</a>
					</div>
				</div>
			</div>
			<!-- MODAL FORM -->
			<div class="card-form">
				<div class="card-row">
					<div>
						<div><label for="qty">QUANTITY</label></div>
						<Input id="qty" type="text" placeholder="0" />
					</div>
					<div>
						<div><label for="loc">LOCATION</label></div>
						<Input id="loc" type="text" placeholder="Binder, box, sleeve ..." />
					</div>
				</div>
				<div class="card-row">
					<div>
						<div><label for="bprice">BOUGHT PRICE</label></div>
						<Input id="bprice" type="text" placeholder="¥" />
					</div>
					<div>
						<div><label for="sprice">SOLD PRICE</label></div>
						<Input id="sprice" type="text" placeholder="¥" />
					</div>
				</div>
				<div>
					<div><label for="mprice">MARKET PRICE</label></div>
					<Input id="mprice" type="text" placeholder="¥" />
				</div>
				<div style="text-align: right; margin-top: 25px;">
					<button class="button" onclick={() => {}}>Save</button>
				</div>
			</div>
		</div>
	{/if}
</Modal>

<style>
	.modal-content img {
		aspect-ratio: 100 / 140;
		object-fit: contain;
		border-radius: 7px;
		width: 108px;
	}
	.modal-content .info-section {
		display: flex;
		padding-right: 2.5rem;
		gap: 1rem;
		padding-bottom: 1.05rem;
		border-bottom: 1px solid var(--color-neutral-soft);
	}
	.modal-content .card-form {
		margin-top: 0.95rem;
	}
</style>
