<script lang="ts">
	const sites: string[] = [
		'https://flappy.stoopid.fun/',
		'https://pokemon.stoopid.fun',
		'https://dvd.stoopid.fun',
		'https://canvas.stoopid.fun'
	];

	// random site from sties
	const randomSite = sites[Math.floor(Math.random() * sites.length)];
</script>

<a href="{randomSite}">
	<button
		class="random-button absolute bottom-0 right-0 origin-bottom-right transform rounded-br-lg rounded-tl-lg px-2 py-1 text-sm transition-transform ease-in-out hover:scale-105"
		>random button???</button
	>
</a>

<style>
	.random-button {
		background: linear-gradient(90deg, #e66465, #9198e5);
	}
</style>
