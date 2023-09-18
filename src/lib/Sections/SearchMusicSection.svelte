<script lang="ts">
  import { subscribe } from "svelte/internal";
  import {
    writable,
    type Writable
  } from "svelte/store";
  import { currentArtist } from "../../store/auth";
  import {
    mapMusic,
    searchQuery,
    type Music
  } from "../../store/music";
  import MusicCard from "../Cards/MusicCard.svelte";
  import { logout } from "../Layout/Header.svelte";
  import Section from "./Section.svelte";

  export const musics: Writable<Music[]> = writable([]);

  export let title: string;
  export let published: boolean = true;

  subscribe(searchQuery, async (query: string) => {
    $musics = [];
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/musics/search/${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${$currentArtist.token}`,
        },
      }
    );

    if (res.status === 401) {
      logout();
      return;
    }

    const data = await res.json();

    data.forEach((music: any) => {
      musics.update((value) => [...value, mapMusic(music)]);
    });
  });
</script>

{#if $musics.length}
  <Section {title}>
    {#each $musics as music}
      <MusicCard {music} {published} />
    {/each}
  </Section>
{/if}
