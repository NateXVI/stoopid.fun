<script lang="ts">
	import Card from './Card.svelte';
	import RandomButton from './RandomButton.svelte';
</script>

<div class="mx-auto w-full max-w-5xl p-4">
	<header
		class="glow bg-base-300 border-info relative flex flex-wrap items-center justify-center gap-10 rounded-xl border p-10"
	>
		<img src="/images/icon.png" alt="stoopid emoji" class="spin h-auto w-20" />
		<div class="text-center">
			<h1 class="text-5xl font-bold">stoopid.fun</h1>
			<p class="text-primary">stoopid sites that you will enjoy</p>
		</div>
		<RandomButton />
	</header>

	<main class="my-10 grid justify-center gap-y-14 gap-x-20 md:grid-cols-2">
		<Card
			src="/images/flappy.gif"
			title="flappy bird clone"
			description="flappy bird clone with an online leaderboard"
			href="https://flappy.stoopid.fun"
			color="#ffeda3"
		/>
		<Card
			src="/images/pokedex.gif"
			title="pokedex"
			description="pokedex that is great for admiring pokemon from your childhood :)"
			href="https://pokemon.stoopid.fun"
			color="#76dd77"
		/>
		<Card
			src="/images/draw.gif"
			title="shared canvas"
			description="the best way to draw with your friends on the internet!"
			href="https://canvas.stoopid.fun"
			color="#29a9cb"
		/>
		<Card
			src="/images/dvd.gif"
			title="dvd simulator"
			description="will it hit the corner???"
			href="https://dvd.stoopid.fun"
			color="#ee9090"
		/>
	</main>
</div>

<style>
	.glow {
		box-shadow: rgb(57, 169, 203) 0 0 20px 5px;
	}

	.spin {
		animation: spin 5s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
