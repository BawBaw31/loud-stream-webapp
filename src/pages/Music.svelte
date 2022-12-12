<script lang="ts">
  import { onMount } from "svelte";
  import { Link, useParams } from "svelte-navigator";
  import { writable, type Writable } from "svelte/store";
  import { logout } from "../lib/Header.svelte";
  import { currentArtist } from "../store/auth";
  import {
    isPlaying,
    mapMusic,
    playingMusic,
    type Music,
  } from "../store/music";

  const params = useParams();
  const music: Writable<Music> = writable(null);
  const loading: Writable<boolean> = writable(true);

  onMount(async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/musics/infos/${$params.id}`,
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
    music.set(mapMusic(data));
    loading.set(false);
  });
</script>

{#if $music}
  <div class="container">
    <img
      src={import.meta.env.VITE_STORAGE_URL + $music.coverFileName}
      alt={$music.title + "'s cover"}
    />
    <div class="infos">
      <p>Single</p>
      <h1>{$music.title}</h1>
      <Link to={`/artists/${$music.owner.id}`}
        ><h2>{$music.owner.stage_name}</h2></Link
      >
      <p>Published {$music.publishedDate.toDateString()}</p>
      <p>Genre : {$music.genre}</p>
    </div>
  </div>

  {#if $playingMusic && $playingMusic.id === $music.id}
    <button class="playPause" on:click={() => ($isPlaying = !$isPlaying)}>
      {#if $isPlaying}
        <img src="/src/assets/icons/pause.svg" alt="Pause" />
      {:else}
        <img src="/src/assets/icons/play.svg" alt="Play" />
      {/if}
    </button>
  {:else}
    <button class="playPause" on:click={() => playingMusic.set($music)}>
      <img src="/src/assets/icons/play.svg" alt="Play" />
    </button>
  {/if}
{:else if $loading}
  <!-- Maybe loader -->
{:else}
  <h1>Music not found</h1>
{/if}

<style>
  div.container {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    padding: 3rem;
  }
  div.container > img {
    width: 25%;
    min-width: 10rem;
    max-width: 20rem;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-right: 3rem;
  }

  div.infos {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  div.infos h1,
  div.infos h2,
  div.infos p {
    margin: 0;
    padding: 0;
  }

  button.playPause {
    background-color: var(--primary);
    border: none;
    padding: 0;
    border-radius: 50px;
    height: 4rem;
    width: 4rem;
    transition: all 0.3s ease-in-out;
  }

  button.playPause img {
    height: 4rem;
    width: 4rem;
  }

  button.playPause:hover {
    transform: scale(1.075);
  }
</style>
