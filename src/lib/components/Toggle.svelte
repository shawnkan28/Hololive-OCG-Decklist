<script lang="ts">
	let {
		value = $bindable(''),
		options = ['True', 'False']
	}: { value?: string; options?: string[] } = $props();
	let toggleRef = $state<HTMLInputElement>();

	$effect(() => {
		if (value === '') {
			value = options[0];
		}
		if (toggleRef) toggleRef.checked = value === options[1];
	});

	function onClick() {
		if (toggleRef) toggleRef.checked = !toggleRef?.checked;
		value = value === options[0] ? options[1] : options[0];
	}
</script>

<div>
	<button style="display: inline-flex; gap: 0.45rem; align-items: center;" onclick={onClick}>
		<input type="checkbox" bind:this={toggleRef} />
		<i></i>
		<span>{value}</span>
	</button>
</div>

<style>
	input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}
	i {
		width: 33px;
		height: 18px;
		border-radius: 999px;
		background: #e9edf6;
		border: 1px solid #cdd5e6;
		position: relative;
	}
	span {
		font-size: 0.82rem;
		color: #656d80;
		cursor: pointer;
		transition: all 0.15s linear;
		line-height: 18px;
		height: 18px;
	}
	input:checked + i {
		background: #8a72d0;
		border-color: #8a72d0;
	}
	i::after {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #7d8699;
		transition:
			transform 0.15s,
			background 0.15s;
	}
	input:checked + i::after {
		transform: translateX(15px);
		background: #fff;
	}
	input:checked ~ span {
		color: #6c56b4;
		font-weight: 600;
	}
</style>
