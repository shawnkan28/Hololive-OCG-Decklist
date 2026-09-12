<script lang="ts">
	import { colorToHex, lookupSet } from '$lib/format';
	import type { Card } from '$lib/types';

	// -----------------------------------------------------------------------------------------
	// PROPERTIES / LOCAL STATES
	// -----------------------------------------------------------------------------------------
	let { data, callback }: { data: Card; callback?: () => void } = $props();

	const hexColor = $derived(colorToHex(data.colors));
	const styleStr = $derived(
		hexColor
			.map((c, i) => {
				return `--color${i}: ${c};`;
			})
			.join(' ')
	);
	const wrapperClass = $derived(
		data.colors.length > 1 ? 'dual' : data.colors.length === 0 ? '' : 'tinted'
	);
	const setStyle = $derived(`--color: ${lookupSet(data.set)};`);

	function clicked() {
		if (callback) callback();
		else window.location.href = data.url;
	}
</script>

<button style={styleStr} class={`card ${wrapperClass}`} onclick={clicked}>
	<div class="img-wrapper"><img src={data.image} alt={data.number} /></div>
	<div class="card-details">
		<div class="card-name">{data.nameEn}</div>
		<div class="set" style={setStyle}><span>{data.number}</span></div>
	</div>
</button>

<style>
	.card {
		border-radius: 10px;
		background-color: white;
		border: 1.5px solid #e2e7f1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: all 0.2s ease;
		text-align: left;
	}
	.card:hover {
		border-color: color-mix(in srgb, var(--color-main) 70%, #fff);
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgba(38, 42, 54, 0.14);
	}
	/* #################################################################################################### */
	/* CARD COLOR */
	/* #################################################################################################### */
	.card.tinted {
		background-color: color-mix(in srgb, var(--color0) 22%, #fff);
		border-color: color-mix(in srgb, var(--color0) 70%, #fff);
	}
	.card.dual {
		border-top-color: color-mix(in srgb, var(--color1) 70%, #fff);
		border-bottom-color: color-mix(in srgb, var(--color0) 70%, #fff);
		border-left-color: color-mix(in srgb, var(--color0) 70%, #fff);
		border-right-color: color-mix(in srgb, var(--color1) 70%, #fff);
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--color0) 22%, #fff) 0%,
			color-mix(in srgb, var(--color0) 22%, #fff) 40%,
			color-mix(in srgb, var(--color1) 22%, #fff) 60%,
			color-mix(in srgb, var(--color1) 22%, #fff) 100%
		);
	}
	.card.dual .card-details {
		/* Soft mid-blend: each color holds near its side, then fades into the other. */
		background: linear-gradient(
			45deg,
			color-mix(in srgb, var(--color0) 22%, #fff) 0%,
			color-mix(in srgb, var(--color0) 22%, #fff) 40%,
			color-mix(in srgb, var(--color1) 22%, #fff) 60%,
			color-mix(in srgb, var(--color1) 22%, #fff) 100%
		);
	}

	/* #################################################################################################### */
	/* IMAGE */
	/* #################################################################################################### */
	.card .img-wrapper {
		aspect-ratio: 100 / 140;
		overflow: hidden;
	}

	.card .img-wrapper img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		-webkit-user-drag: none;
		user-select: none;
	}

	.card .card-details {
		padding: 0.4rem 0.5rem;
		gap: 0.12rem;
		display: flex;
		flex-direction: column;
	}

	.card .card-details .card-name {
		font-size: 0.75rem;
		font-weight: 700;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 1.3;
	}

	.card .card-details .set span {
		padding: 2px 5px;
		background: color-mix(in srgb, var(--color) 60%, #fff);
		font-size: 0.7rem;
		color: white;
		font-weight: 700;
		border-radius: 6px;
	}
</style>
