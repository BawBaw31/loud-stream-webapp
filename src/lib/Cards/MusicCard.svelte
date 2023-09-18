<script lang="ts">
  import { Link, useNavigate } from "svelte-navigator";
  import { isPlaying, playingMusic, type Music } from "../../store/music";

  export let music: Music;
  export let published: boolean = true;

  const navigate = useNavigate();
</script>

<div
  class="card"
  on:click|stopPropagation={() => {
    navigate(`/musics/${!published ? "unpublished/" : ""}${music.id}`);
  }}
>
  <img
    src={import.meta.env.VITE_STORAGE_URL + music.coverFileName}
    alt={music.title + "'s cover"}
  />
  <h2>{music.title}</h2>
  {#if !published}
    <p class="unpublished">Unpublished</p>
  {:else}
    <Link to={`/artists/${music.owner.id}`}>
      {music.owner.stage_name}
    </Link>
  {/if}
  <p>{music.releaseDate.toDateString()}</p>

  {#if $playingMusic && $playingMusic.id === music.id}
    <button on:click|stopPropagation={() => ($isPlaying = !$isPlaying)}>
      {#if $isPlaying}
        <img src="/src/assets/icons/pause.svg" alt="Pause" />
      {:else}
        <img src="/src/assets/icons/play.svg" alt="Play" />
      {/if}
    </button>
  {:else}
    <button on:click|stopPropagation={() => playingMusic.set(music)}>
      <img src="/src/assets/icons/play.svg" alt="Play" />
    </button>
  {/if}
</div>

<style>
  div.card {
    position: relative;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 10rem;
    cursor: pointer;
    background-color: rgba(131, 124, 124, 0.1);
  }

  div.card:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  div.card > img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  div.card h2 {
    margin: 0;
    font-size: 1.2rem;
  }

  div.card p {
    margin: 0;
    font-size: 0.7rem;
    line-height: 1rem;
  }

  div.card p.unpublished {
    color: var(--primary);
    font-style: italic;
    font-size: 0.8rem;
    line-height: 1.5rem;
  }

  :global(a) {
    color: var(--primary);
    text-decoration: none;
    font-size: 1rem;
  }

  :global(a):hover {
    text-decoration: underline;
    color: var(--primary);
  }

  div.card button {
    z-index: 1;
    position: absolute;
    top: 7.5rem;
    right: 1.5rem;
    background-color: var(--primary);
    border: none;
    padding: 0;
    border-radius: 50px;
    height: 3rem;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    transform: translateY(0.5rem);
  }

  div.card button img {
    height: 3rem;
    width: 3rem;
  }

  div.card:hover button {
    opacity: 1;
    transform: translateY(0);
  }

  div.card:hover button:hover {
    transform: scale(1.075);
  }
</style>
