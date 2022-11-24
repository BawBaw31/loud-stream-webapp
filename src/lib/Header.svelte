<script lang="ts">
  import CustomButton from "./CustomButton.svelte";
  import { currentArtist } from "../store/auth";

  const logout = () => {
    $currentArtist = null;
  };
</script>

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

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 10%;
    background-color: var(--primary);
    box-shadow: 0 2px 8px rgba(94, 106, 109, 0.5);
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
