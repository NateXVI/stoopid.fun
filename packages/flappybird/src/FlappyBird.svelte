<script lang="ts">
  import P5 from "p5-svelte";
  import sketch from "./sketch";
  import SoundToggle from "./SoundToggle.svelte";
  import { Icon, Home } from "svelte-hero-icons";
</script>

<div>
  <div class="mx-auto grid max-w-[1200px] place-items-center overflow-hidden">
    <div class="pb-5">
      <P5 {sketch} />
    </div>
  </div>
  <div
    class="mx-auto mb-5 flex max-w-[1200px] justify-between gap-5 rounded bg-gray-50 p-4"
  >
    <a
      href="../"
      data-sveltekit-reload
      class="flex gap-2 text-gray-600 hover:underline"
    >
      <Icon src={Home} class="h-5 w-5" />
      Back to stoopid.fun</a
    >
    <SoundToggle />
  </div>
</div>

<style global>
  canvas.p5Canvas {
    @apply block rounded;
  }
  @media (min-height: 934px) {
    canvas.p5Canvas {
      @apply mt-[17px];
    }
  }
</style>
