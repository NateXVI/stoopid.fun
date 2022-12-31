<script lang="ts">
	export let src: string;
	export let title: string;
	export let description: string;
	export let href: string;
	export let color: string;
	export let shouldReload: boolean = false;
</script>

<a href="{href}" data-sveltekit-reload="{shouldReload ? true : 'off'}">
	<div
		class="card grid aspect-[2/3] w-full max-w-md grid-rows-6 overflow-hidden rounded-3xl"
		style="background-color: {color};"
	>
		<div class="row-span-4 h-full w-full bg-white">
			<img src="{src}" alt="" class="h-full w-full object-cover" />
		</div>
		<div class="row-span-2 h-full w-full p-4 px-6">
			<div class="label-shadow bg-white p-4">
				<h2 class="truncate whitespace-nowrap text-3xl font-semibold text-black">{title}</h2>
			</div>
			<p class="py-4 text-lg font-medium text-black">{description}</p>
		</div>
	</div>
</a>

<style>
	.label-shadow {
		box-shadow: 1px 1px 2.5px 0 rgba(0, 0, 0, 0.5);
	}

	.card {
		transition: 0.25s ease-out;
		box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.75);
	}

	.card:hover {
		transform: rotate(-5deg) scale(1.1) translate(0, -10px);
		box-shadow: 15px 23px 30px 0px rgba(0, 0, 0, 0.75);
	}
</style>
