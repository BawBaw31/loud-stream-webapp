<script type="ts">
  import type { Music } from "../store/music";

  export let music: Music;
</script>

<div class="card">
  <img
    src={import.meta.env.VITE_STORAGE_URL + music.coverFileName}
    alt={music.title + "'s cover"}
  />
  <h2>{music.title}</h2>
  <p>By {music.owner.stage_name}</p>
  <p>{music.releaseDate.toDateString()}</p>
</div>

<style>
  div.card {
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
  }

  div.card img {
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
</style>
