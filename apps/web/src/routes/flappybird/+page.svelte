<script lang="ts">
	export const prerender = false;
	export const ssr = false;
	import { FlappyBird } from '@stoopid/flappybird';
	import FullReload from '$lib/components/FullReload.svelte';
</script>

<svelte:head>
	<link rel="manifest" href="/flappybird/manifest.json" />
	<link rel="apple-touch-icon" href="/flappybird/icon_512.png" />
</svelte:head>

<FullReload />
<FlappyBird />
