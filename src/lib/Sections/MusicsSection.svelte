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

  const rowSize: number = 6;
  const max: Writable<number> = writable(rowSize);
  const isExpended: Writable<boolean> = writable(false);

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

  const seeMore = () => {
    max.set(15);
    isExpended.set(true);
  };

  const seeLess = () => {
    max.set(rowSize);
    isExpended.set(false);
  };
</script>

{#if $musics.length}
  <section>
    <div class="section-header">
      <h2>{title}</h2>
      {#if $musics.length > rowSize}
        {#if $isExpended}
          <button on:click={seeLess}>−</button>
        {:else}
          <button on:click={seeMore}>+</button>
        {/if}
      {/if}
    </div>
    <div class="section-content">
      {#each Array($max < $musics.length ? $max : $musics.length) as _, i}
        <MusicCard music={$musics[i]} {published} />
      {/each}
    </div>
  </section>
{/if}

<style>
  button {
    display: flex;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    background-color: transparent;
    transition: all 0.3s ease-in-out;
    width: 2rem;
    height: 2rem;
    justify-content: center;
    align-items: center;
    color: var(--primary);
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(0) scale(1.075);
  }

  section {
    display: grid;
    grid-gap: 1rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
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
