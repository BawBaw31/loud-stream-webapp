<script lang="ts">
  import { useParams } from "svelte-navigator";
  import type { Readable } from "svelte/store";
  import MusicsSection from "../lib/Sections/MusicsSection.svelte";
  import type { Owner } from "../store/music";

  const params = useParams();
  let artist: Readable<Owner>;
</script>

{#if $artist}
  <h1>{$artist.stage_name}</h1>
{/if}
<MusicsSection bind:artist title="Music" url={`artist/${$params.id}`} />
