<script lang="ts">
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { currentArtist } from "../../store/auth";
  import { mapMusic, type Music } from "../../store/music";
  import MusicCard from "../Cards/MusicCard.svelte";
  import Section from "./Section.svelte";

  const myMusics: Writable<Music[]> = writable([]);

  onMount(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/musics/me`, {
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
      myMusics.update((value) => [...value, mapMusic(music)]);
    });
  });
</script>

{#if $myMusics.length}
  <Section title="My Musics" seeMoreLink="/">
    {#each $myMusics as music}
      <MusicCard {music} />
    {/each}
  </Section>
{/if}
