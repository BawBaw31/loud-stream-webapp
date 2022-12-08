<script type="ts">
  import { subscribe, to_number } from "svelte/internal";
  import {
    isPlaying,
    playingMusic,
    playingMusicAudioElement,
    type Music,
  } from "../../store/music";
  import Controls from "./Controls.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  let updateTime: () => void;
  let toggleTimeRunning: () => void;

  subscribe(playingMusic, async (value: Music) => {
    if (value) {
      try {
        if (isPlaying) {
          await playPauseMusic();
        }
        await playingMusicAudioElement.set(
          new Audio(`${import.meta.env.VITE_API_URL}/musics/${value.id}`)
        );
        $playingMusicAudioElement.onloadedmetadata = () => {
          updateTime();
        };
        await playPauseMusic();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const playPauseMusic = async () => {
    if ($playingMusicAudioElement) {
      if ($isPlaying) {
        toggleTimeRunning();
        $playingMusicAudioElement.pause();
        $isPlaying = false;
      } else {
        toggleTimeRunning();
        await $playingMusicAudioElement.play();
        // TODO: Music is muted for dev purposes only, unmute it when deploying
        $playingMusicAudioElement.muted = true;
        $isPlaying = true;
      }
    }
  };
</script>

{#if $playingMusicAudioElement}
  <footer>
    <div class="audio-player">
      <div class="audio-player-infos">
        <img
          src={import.meta.env.VITE_STORAGE_URL + $playingMusic.coverFileName}
          alt={$playingMusic.title + "'s cover"}
        />
        <div class="audio-player-infos-text">
          <p>{$playingMusic.title}</p>
          <p>{$playingMusic.owner.stage_name}</p>
        </div>
      </div>
      <ProgressBar bind:updateTime bind:toggleTimeRunning />
      <Controls
        on:playpause={playPauseMusic}
        on:next={() => console.log("next music")}
        on:prev={() => console.log("prev music")}
      />
    </div>
  </footer>
{/if}

<style>
  footer {
    position: absolute;
    bottom: 0.4rem;
    left: 0.2rem;
    right: 0.2rem;
    background-color: var(--primary);
    box-shadow: 2px -2px 8px rgba(94, 106, 109, 0.5);
    padding: 1rem 10%;
    border-radius: 1rem;
    animation-duration: 0.5s;
    animation-name: slidein;
  }

  div.audio-player {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div.audio-player-infos {
    display: flex;
    align-items: center;
  }

  div.audio-player-infos p {
    margin: 0;
  }

  div.audio-player-infos img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-right: 1rem;
  }

  div.audio-player-infos-text p:first-child {
    font-size: 1.2rem;
  }

  div.audio-player-infos-text p:last-child {
    font-size: 0.8rem;
    line-height: 1rem;
    color: rgb(215, 207, 207);
  }

  @keyframes slidein {
    0% {
      left: -100%;
      right: 100%;
    }

    65% {
      left: 2%;
      right: -2%;
    }

    80% {
      left: -1%;
      right: 1%;
    }

    100% {
      left: 0.2rem;
      right: 0.2rem;
    }
  }
</style>
