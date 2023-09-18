<script lang="ts">
  import { subscribe } from "svelte/internal";
  import { writable, type Writable } from "svelte/store";
  import { currentArtist } from "../../store/auth";
  import { mapArtist, searchQuery, type Owner } from "../../store/music";
  import { logout } from "../Layout/Header.svelte";
  import Section from "./Section.svelte";
  import ArtistCard from "../Cards/ArtistCard.svelte";

  export const artists: Writable<Owner[]> = writable([]);

  export let title: string;

  subscribe(searchQuery, async (query: string) => {
    $artists = [];
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/artists/search/${query}`,
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

    data.forEach((artist: any) => {
      artists.update((value) => [...value, mapArtist(artist)]);
    });
  });
</script>

{#if $artists.length}
  <Section {title}>
    {#each $artists as artist}
      <ArtistCard {artist} />
    {/each}
  </Section>
{/if}
