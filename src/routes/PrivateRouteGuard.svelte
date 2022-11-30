<script>
  import { useLocation, useNavigate } from "svelte-navigator";
  import Header from "../lib/Header.svelte";
  import MusicPlayer from "../lib/MusicPlayer/MusicPlayer.svelte";
  import { currentArtist } from "../store/auth";

  const navigate = useNavigate();
  const location = useLocation();

  $: if (!$currentArtist) {
    navigate("/login", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if $currentArtist}
  <div class="page">
    <Header />
    <slot />
    <MusicPlayer />
  </div>
{/if}

<style>
  div.page {
    height: 100vh;
  }
</style>