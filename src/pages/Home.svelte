<script lang="ts">
  import CustomButton from "../lib/CustomButton.svelte";
  import { currentArtist } from "../store/auth";

  const logout = () => {
    $currentArtist = null;
  };
</script>

<div class="page">
  <header>
    <img
      id="logo"
      src="/logo_loud_stream_transparent.png"
      alt="Loud Stream logo"
    />
    <h1>Hello {$currentArtist.stage_name}</h1>
    <CustomButton
      on:click={logout}
      btnStyle="secondary"
      btnType="submit"
      btnSize="small"
      text="Logout"
    />
  </header>
</div>

<style>
  div.page {
    height: 100vh;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1.5rem;
    background-color: var(--primary);
  }

  header h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  img#logo {
    width: 3.5rem;
    height: 3.5rem;
  }
</style>
