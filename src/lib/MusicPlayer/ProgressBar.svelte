<script type="ts">
  import { to_number } from "svelte/internal";
  import {
    isPlaying,
    playingMusic,
    playingMusicAudioElement,
  } from "../../store/music";

  let totalTimeDisplay: string;
  let currTimeDisplay: string = "0:00:00";
  let progress: number = 0;
  let trackTimer: NodeJS.Timer;

  export const updateTime = () => {
    progress =
      $playingMusicAudioElement.currentTime *
      (100 / $playingMusic.totalTrackTime);

    let currHrs = Math.floor($playingMusicAudioElement.currentTime / 60 / 60);
    let currMins = Math.floor($playingMusicAudioElement.currentTime / 60);
    let currSecs = Math.floor(
      $playingMusicAudioElement.currentTime - currMins * 60
    );

    let durHrs = Math.floor($playingMusic.totalTrackTime / 60 / 60);
    let durMins = Math.floor(($playingMusic.totalTrackTime / 60) % 60);
    let durSecs = Math.floor(
      $playingMusic.totalTrackTime - durHrs * 60 * 60 - durMins * 60
    );

    currTimeDisplay = `${currMins < 10 ? "0" : ""}${currMins}:${
      currSecs < 10 ? "0" : ""
    }${currSecs}`;
    totalTimeDisplay = `${durMins < 10 ? "0" : ""}${durMins}:${
      durSecs < 10 ? "0" : ""
    }${durSecs}`;

    if ($playingMusicAudioElement.ended) {
      toggleTimeRunning();
    }
  };

  export const toggleTimeRunning = () => {
    if ($playingMusicAudioElement.ended) {
      $isPlaying = false;
      clearInterval(trackTimer);
    } else {
      trackTimer = setInterval(updateTime, 1000);
    }
  };
</script>

{#if totalTimeDisplay && $playingMusic}
  <div class="progress-bar-container">
    <span id="progress-time">{currTimeDisplay}</span>
    <div class="progress-bar">
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        bind:value={progress}
        on:mousedown={() => {
          clearInterval(trackTimer);
        }}
        on:mouseup={() => {
          trackTimer = setInterval(updateTime, 1000);
        }}
        on:change={() => {
          $playingMusicAudioElement.currentTime =
            (progress * $playingMusic.totalTrackTime) / 100;
        }}
      />
      <div class="progress-indicator" style="left: {progress}%;" />
    </div>
    <span id="track-duration">{totalTimeDisplay}</span>
  </div>
{/if}

<style>
  .progress-bar-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 2rem;
  }

  #progress-time,
  #track-duration {
    font-size: 0.8rem;
  }

  .progress-bar {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 0.5rem;
    margin: 0 0.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  input[type="range"] {
    z-index: 1;
    -webkit-appearance: none;
    width: 100%;
    height: 0.5rem;
    background: var(--bg-dark);
    border-radius: 0.5rem;
    outline: none;
    opacity: 0.5;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    cursor: pointer;
    margin: 0;
  }

  input[type="range"]:hover {
    opacity: 0.7;
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 0.5rem;
    height: 0.5rem;
    cursor: pointer;
    opacity: 0;
  }

  input[type="range"]::-moz-range-thumb {
    width: 0.5rem;
    height: 0.5rem;
    cursor: pointer;
    opacity: 0;
  }

  div.progress-indicator {
    position: absolute;
    top: calc(50% - 0.25rem);
    width: 100%;
    height: 0.5rem;
    background: var(--bg-dark);
    transform: translateX(-100%);
    border-radius: 0.5rem;
  }
</style>
