<script lang="ts">
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import { writable, type Writable } from "svelte/store";
  import { currentArtist } from "../store/auth";
  import { mapMusic, type Music } from "../store/music";

  const params = useParams();
  const music: Writable<Music> = writable(null);

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
      $currentArtist = null;
      return;
    }

    const data = await res.json();
    music.set(mapMusic(data));
  });
</script>

{#if $music}
  <h1>{$music.title}</h1>
  <h2>{$music.owner.stage_name}</h2>
  <h3>{$music.genre}</h3>
  <p>{$music.publishedDate.toDateString()}</p>
  <p>{$music.genre}</p>
{:else}
  <h1>Music not found</h1>
{/if}
