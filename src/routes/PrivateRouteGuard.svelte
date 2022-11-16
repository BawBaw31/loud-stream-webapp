<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { currentArtist } from "../store/auth";

  const navigate = useNavigate();
  const location = useLocation();

  $: if (!$currentArtist) {
    navigate("/login", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if $currentArtist}
  <slot />
{/if}
