<script>
  import { createEventDispatcher } from "svelte";

  export let isPlaying;
  const dispatch = createEventDispatcher();
  let actualPlaylist = [];
</script>

<div class="audio-player-controls">
  <button disabled={!actualPlaylist.length} on:click={() => dispatch("prev")}>
    <img src="/src/assets/icons/prev.svg" alt="Previous" />
  </button>

  <button on:click={() => dispatch("playpause")} id="play-pause-btn">
    {#if isPlaying}
      <img src="/src/assets/icons/pause.svg" alt="Pause" />
    {:else}
      <img src="/src/assets/icons/play.svg" alt="Play" />
    {/if}
  </button>

  <button disabled={!actualPlaylist.length} on:click={() => dispatch("next")}>
    <img src="/src/assets/icons/next.svg" alt="Next" />
  </button>
</div>

<style>
  div.audio-player-controls {
    display: flex;
    align-items: center;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    height: 32px;
    border-radius: 50px;
  }

  button#play-pause-btn {
    height: 64px;
    margin: 0 1rem;
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  button:focus {
    outline: none;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled:hover {
    background-color: transparent;
  }
</style>
