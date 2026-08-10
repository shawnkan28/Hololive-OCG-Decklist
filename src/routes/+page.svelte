<script lang="ts">
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import logo from '$lib/assets/favicon.png';
</script>

{@render navbar()}

<div class="content"></div>

{#snippet navbar()}
	<div class="navbar">
		<div class="inner">
			<!-- Whole Clickable Div si the title and icon  -->
			<ClickableDiv class="title" onclick={() => {}}>
				<img src={logo} alt="hololive OCG" width="30" height="30" />
				<div>Hololive OCG</div>
				<div class="desc">Card Browser</div>
			</ClickableDiv>
			<!-- Other content like the searchbar and filter goes here. -->
			<div style="flex: 1;"></div>
		</div>
	</div>
{/snippet}

<style>
</style>
