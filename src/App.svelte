<script>
  import { currentArtist } from "./store/auth";
  import Home from "./pages/Home.svelte";
  import NotFound from "./pages/NotFound.svelte";
</script>

<main>
  {#if $currentArtist != null}
    <NotFound />
  {:else}
    <Home />
  {/if}
</main>
