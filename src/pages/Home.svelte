<script lang="ts">
  import Header from "../lib/Header.svelte";
  import LatestReleases from "../lib/LatestReleases.svelte";
  import MusicPlayer from "../lib/MusicPlayer/MusicPlayer.svelte";
</script>

<div class="page">
  <Header />
  <main>
    <h2>Latest Releases</h2>
    <LatestReleases />
  </main>
  <MusicPlayer />
</div>

<style>
  div.page {
    height: 100vh;
  }

  main {
    padding: 0 10%;
  }
</style>
