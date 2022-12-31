<script lang="ts">
  export let sound: boolean = true;

  const toggle = () => {
    sound = !sound;

    const event = new CustomEvent("flappy-sound-toggle", {
      detail: { sound },
    });
    document.dispatchEvent(event);
  };

  if (typeof window !== "undefined") {
    sound = localStorage.getItem("flappy-muted") !== "true";
  }
</script>

<div class="flex items-center gap-2">
  <label for="sound-toggle" class="font-medium text-gray-700">Sound</label>
  <button
    type="button"
    class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-400 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    role="switch"
    name="sound-toggle"
    aria-checked={sound}
    on:click={toggle}
  >
    <span class="sr-only">Use setting</span>
    <span
      class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {sound
        ? 'translate-x-5'
        : 'translate-x-0'}"
    >
      <span
        class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ease-in {sound
          ? 'opacity-0 ease-out duration-100'
          : 'opacity-100 ease-in duration-200'}"
        aria-hidden="true"
      >
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path
            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span
        class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ease-out {sound
          ? 'opacity-100 ease-in duration-200'
          : 'opacity-0 ease-out duration-100'}"
        aria-hidden="true"
      >
        <svg
          class="h-3 w-3 text-indigo-600"
          fill="currentColor"
          viewBox="0 0 12 12"
        >
          <path
            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
          />
        </svg>
      </span>
    </span>
  </button>
</div>
