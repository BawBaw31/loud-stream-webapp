<script lang="ts">
  import MyMusics from "../lib/Sections/MyMusics.svelte";
  import { currentArtist } from "../store/auth";
</script>

<h1>{$currentArtist.stage_name}</h1>
<MyMusics />
