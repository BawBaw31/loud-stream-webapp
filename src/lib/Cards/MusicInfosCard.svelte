<script lang="ts">
  import { Link } from "svelte-navigator";
  import type { Music } from "../../store/music";

  export let music: Music;
</script>

<div class="container">
  <img
    src={import.meta.env.VITE_STORAGE_URL + music.coverFileName}
    alt={music.title + "'s cover"}
  />
  <div class="infos">
    <p>Single</p>
    <h1>{music.title}</h1>
    <Link to={`/artists/${music.owner.id}`}
      ><h2>{music.owner.stage_name}</h2></Link
    >
    <p>Published {music.publishedDate.toDateString()}</p>
    <p>Genre : {music.genre}</p>
  </div>
</div>

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
</style>
