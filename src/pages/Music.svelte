<script lang="ts">
  import { onMount } from "svelte";
  import { useNavigate, useParams } from "svelte-navigator";
  import { writable, type Writable } from "svelte/store";
  import MusicInfosCard from "../lib/Cards/MusicInfosCard.svelte";
  import CustomButton from "../lib/CustomButton.svelte";
  import { logout } from "../lib/Layout/Header.svelte";
  import PlayPauseButton from "../lib/PlayPauseButton.svelte";
  import { currentArtist } from "../store/auth";
  import { mapMusic, type Music } from "../store/music";

  export let published: boolean = true;

  const params = useParams();
  const music: Writable<Music> = writable(null);
  const loading: Writable<boolean> = writable(true);
  const navigate = useNavigate();

  onMount(async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/musics${
        !published ? "/unpublished" : ""
      }/infos/${$params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${$currentArtist.token}`,
        },
      }
    );

    if (res.status === 401) {
      logout();
      return;
    }

    const data = await res.json();
    music.set(mapMusic(data));
    loading.set(false);
  });

  const publishMusic = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/musics/${$music.id}/publish`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${$currentArtist.token}`,
          },
        }
      );
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };
</script>

{#if $music}
  <MusicInfosCard music={$music} />
  {#if !published}
    <div class="unpublished-container">
      <p>Unpublished</p>
      <CustomButton btnSize="small" on:click={publishMusic}>Publish</CustomButton>
    </div>
  {/if}
  <PlayPauseButton music={$music} />
{:else if $loading}
  <!-- Maybe loader -->
{:else}
  <h1>Music not found</h1>
{/if}

<style>
  div.unpublished-container {
    display: flex;
    align-items: center;
  }

  div.unpublished-container p {
    color: var(--primary);
    font-style: italic;
    margin-right: 1rem;
  }
</style>
