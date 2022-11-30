<script lang="ts">
  import { currentArtist } from "../store/auth";

  const toggleDropdown = () => {
    const dropdown = document.querySelector(".dropdown-content");
    dropdown.classList.toggle("hidden");
  };

  const logout = () => {
    $currentArtist = null;
  };
</script>

<header>
  <a href="/">
    <img
      id="logo"
      src="/logo_loud_stream_transparent.png"
      alt="Loud Stream logo"
    />
  </a>
  <h1>Hello {$currentArtist.stage_name}</h1>
  <div class="dropdown-container">
    <button on:click={toggleDropdown}
      ><img src="/src/assets/icons/account-cog.svg" alt="Account" /></button
    >
    <nav class="dropdown-content hidden">
      <a href="/profile">Profile</a>
      <a href="/upload">Upload</a>
      <a href="/settings">Settings</a>
      <button on:click={logout}>Logout</button>
    </nav>
  </div>
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

  header a {
    height: 56px;
  }

  header h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  img#logo {
    width: 3.5rem;
    height: 3.5rem;
  }

  div.dropdown-container {
    position: relative;
    max-height: 2.5rem;
    max-width: 2.5rem;
    align-items: flex-end;
  }

  div.dropdown-container button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    height: 2.5rem;
    border-radius: 50px;
  }

  div.dropdown-container button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  nav.dropdown-content {
    position: relative;
    top: 1.25rem;
    right: 2.75rem;
    width: 8rem;
    z-index: 2;
    background-color: var(--primary);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
  }

  nav.dropdown-content a,
  nav.dropdown-content button {
    display: block;
    text-decoration: none;
    font-size: 1rem;
    color: var(--text);
    border-radius: 5px;
    text-align: center;
    padding: 0.75rem 1rem;
    height: 1.5rem;
  }

  nav.dropdown-content a:hover,
  nav.dropdown-content button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  nav.dropdown-content button {
    width: 100%;
    height: max-content;
  }

  .hidden {
    display: none;
  }
</style>
