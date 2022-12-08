<script type="ts">
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import { currentArtist } from "../store/auth";
  import { latestReleases, mapMusic } from "../store/music";
  import MusicCard from "./MusicCard.svelte";

  onMount(async () => {
    $latestReleases = [];
    const res = await fetch(`${import.meta.env.VITE_API_URL}/musics/latest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${$currentArtist.token}`,
      },
    });

    if (res.status === 401) {
      $currentArtist = null;
      return;
    }

    const data = await res.json();

    data.forEach((music: any) => {
      latestReleases.update((value) => [...value, mapMusic(music)]);
    });
  });
</script>

<section>
  <div class="section-header">
    <h2>Latest Releases</h2>
    <Link to="/">See More</Link>
  </div>
  <div class="section-content">
    {#each $latestReleases as music}
      <MusicCard {music} />
    {/each}
  </div>
</section>

<style>
  section {
    display: grid;
    grid-gap: 1rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section-header h2 {
    margin: 0;
  }

  .section-header :global(a) {
    color: var(--primary);
    text-decoration: none;
    font-size: 0.8rem;
  }

  .section-header :global(a):hover {
    text-decoration: underline;
  }

  .section-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(11.5rem, 1fr));
    grid-gap: 1rem;
  }
</style>
