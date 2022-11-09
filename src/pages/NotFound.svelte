<script lang="ts">
  import CustomButton from "../lib/CustomButton.svelte";
  import { currentArtist } from "../store/auth";

  const logout = () => {
    $currentArtist = null;
  };
</script>

<main>
  <h1>Page not Found</h1>
  <CustomButton
    on:click={logout}
    btnStyle="primary"
    btnType="submit"
    btnSize="small"
    text="Logout"
  />
</main>
