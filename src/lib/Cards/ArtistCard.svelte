<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import type { Owner } from "../../store/music";

  export let artist: Owner;

  const navigate = useNavigate();
</script>

<div
  class="card"
  on:click|stopPropagation={() => {
    navigate(`/artists/${artist.id}`);
  }}
>
  <h2>{artist.stage_name}</h2>
</div>

<style>
  div.card {
    position: relative;
    border-radius: 0.5rem;
    padding: 1rem;
    width: max-content;
    cursor: pointer;
    background-color: rgba(131, 124, 124, 0.1);
  }

  div.card:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  div.card h2 {
    margin: 0;
    font-size: 1.2rem;
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
</style>
