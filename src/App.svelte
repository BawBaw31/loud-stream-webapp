<script>
  import { currentArtist } from "./store/auth";
  import Auth from "./pages/Auth.svelte";
  import Home from "./pages/Home.svelte";
</script>

<main>
  {#if $currentArtist != null}
    <Home />
  {:else}
    <Auth />
  {/if}
</main>
