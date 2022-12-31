<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	afterNavigate((e) => {
		// the page should be reloaded if the user navigates to it from another page
		// so that the game is not restarted which causes the game to be unplayable
		if (e.from !== null) {
			window.location.reload();
		}
	});
</script>

<!--
    This component should be place on pages with p5.js scripts
    so that the page is reloaded when the user navigates to it. 
    If the page is not reloaded there will be glitches that make
	the script unusable.
-->
