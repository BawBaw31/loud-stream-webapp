<script lang="ts">
  import { Link } from "svelte-navigator";
  import MusicsSection from "../lib/Sections/MusicsSection.svelte";
  import { currentArtist } from "../store/auth";
</script>

<div>
  <h1>{$currentArtist.stage_name}</h1>
  <Link to="/upload">Uplaod</Link>
</div>
<MusicsSection title="My Music" url="me/true" />
<MusicsSection title="My Unpublished Music" url="me/false" published={false} />

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
