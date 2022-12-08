<script>
  import { useLocation, useNavigate } from "svelte-navigator";
  import { currentArtist } from "../store/auth";

  const navigate = useNavigate();
  const location = useLocation();

  $: if (!$currentArtist) {
    navigate("/", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if $currentArtist}
  <slot />
{/if}
