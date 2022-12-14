<script lang="ts">
  import { onMount } from "svelte";
  import {
    derived,
    writable,
    type Readable,
    type Writable,
  } from "svelte/store";
  import { currentArtist } from "../../store/auth";
  import { mapMusic, type Music, type Owner } from "../../store/music";
  import MusicCard from "../Cards/MusicCard.svelte";
  import { logout } from "../Layout/Header.svelte";
  import Section from "./Section.svelte";

  export const musics: Writable<Music[]> = writable([]);
  export const artist: Readable<Owner | null> = derived(musics, ($musics) => {
    if ($musics.length === 0) {
      return null;
    }
    return $musics[0].owner;
  });

  export let url: string;
  export let title: string;
  export let published: boolean = true;

  onMount(async () => {
    $musics = [];
    const res = await fetch(`${import.meta.env.VITE_API_URL}/musics/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${$currentArtist.token}`,
      },
    });

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
  <Section {title} seeMoreLink="/">
    {#each $musics as music}
      <MusicCard {music} {published} />
    {/each}
  </Section>
{/if}
