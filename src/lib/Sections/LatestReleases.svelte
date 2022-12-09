<script lang="ts">
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { currentArtist } from "../../store/auth";
  import { mapMusic, type Music } from "../../store/music";
  import MusicCard from "../Cards/MusicCard.svelte";
  import Section from "./Section.svelte";

  export const latestReleases: Writable<Music[]> = writable([]);

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

<Section title="Latest Releases" seeMoreLink="/">
  {#each $latestReleases as music}
    <MusicCard {music} />
  {/each}
</Section>
