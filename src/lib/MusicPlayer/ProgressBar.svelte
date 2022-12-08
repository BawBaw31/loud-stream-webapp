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

    if (currSecs < 10) currSecs = to_number(`0${currSecs}`);
    if (durSecs < 10) durSecs = to_number(`0${durSecs}`);
    if (currMins < 10) currMins = to_number(`0${currMins}`);
    if (durMins < 10) durMins = to_number(`0${durMins}`);

    currTimeDisplay = `${currMins}:${currSecs}`;
    totalTimeDisplay = `${durMins}:${durSecs}`;

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
  <div class="progress-bar">
    <div id="time">
      <span id="progress-time">{currTimeDisplay}</span>
      <span id="track-duration">{totalTimeDisplay}</span>
    </div>
    <input
      type="range"
      min="0"
      max="100"
      step="0.1"
      bind:value={progress}
      on:change={() => {
        $playingMusicAudioElement.currentTime =
          (progress * $playingMusic.totalTrackTime) / 100;
      }}
    />
  </div>
{/if}
