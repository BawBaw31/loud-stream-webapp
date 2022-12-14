<script lang="ts">
  import { isPlaying, playingMusic, type Music } from "../store/music";

  export let music: Music;
</script>

{#if $playingMusic && $playingMusic.id === music.id}
  <button class="playPause" on:click={() => ($isPlaying = !$isPlaying)}>
    {#if $isPlaying}
      <img src="/src/assets/icons/pause.svg" alt="Pause" />
    {:else}
      <img src="/src/assets/icons/play.svg" alt="Play" />
    {/if}
  </button>
{:else}
  <button class="playPause" on:click={() => playingMusic.set(music)}>
    <img src="/src/assets/icons/play.svg" alt="Play" />
  </button>
{/if}

<style>
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
