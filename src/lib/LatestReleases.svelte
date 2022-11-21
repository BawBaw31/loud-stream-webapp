<script type="ts">
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import { onMount } from "svelte";
  import { currentArtist } from "../store/auth";
  import { latestReleases, mapMusic } from "../store/music";
  import MusicCard from "./MusicCard.svelte";

  onMount(async () => {
    $latestReleases = [];
    const res = await fetch(`${import.meta.env.VITE_API_URL}/musics`, {
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

<Splide
  options={{
    perPage: 3,
    rewind: true,
    width: 800,
    gap: "0",
  }}
  aria-label="Latest releases carousel"
>
  {#each $latestReleases as music}
    <SplideSlide>
      <MusicCard {music} />
    </SplideSlide>
  {/each}
</Splide>
