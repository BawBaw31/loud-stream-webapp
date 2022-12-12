<script lang="ts">
  import MusicsSection from "../lib/Sections/MusicsSection.svelte";
  import { currentArtist } from "../store/auth";
</script>

<h1>{$currentArtist.stage_name}</h1>
<MusicsSection title="My Music" url="me" />

