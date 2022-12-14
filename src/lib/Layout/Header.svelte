<script context="module">
  export const logout = () => {
    console.log("logout");
    currentArtist.set(null);
    window.location.reload();
  };
</script>

<script lang="ts">
  import { Link } from "svelte-navigator";
  import { currentArtist } from "../../store/auth";

  let header: HTMLElement;
  let dropdown: HTMLElement;
  let dropdownButton: HTMLElement;

  const toggleDropdown = () => {
    dropdown.classList.toggle("hidden");
  };

  const onWindowClick = (e: MouseEvent) => {
    if (
      !dropdownButton.contains(e.target as Node) &&
      !dropdown.classList.contains("hidden")
    ) {
      dropdown.classList.add("hidden");
    }
  };

  const onScroll = () => {
    if (window.scrollY > 5) {
      header.classList.remove("not-scrolled");
    } else {
      header.classList.add("not-scrolled");
    }
  };
</script>

<svelte:window on:click={onWindowClick} on:scroll={onScroll} />

<header class="not-scrolled" bind:this={header}>
  <Link to="/">
    <img
      id="logo"
      src="/logo_loud_stream_transparent.png"
      alt="Loud Stream logo"
    />
  </Link>
  <h1>Hello {$currentArtist.stage_name}</h1>
  <div class="dropdown-container">
    <button on:click={toggleDropdown} bind:this={dropdownButton}
      ><img src="/src/assets/icons/account-cog.svg" alt="Account" /></button
    >
    <nav class="dropdown-content hidden" bind:this={dropdown}>
      <Link to="/profile">Profile</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/settings">Settings</Link>
      <button on:click={logout}>Logout</button>
    </nav>
  </div>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 10%;
    z-index: 2;
    transition: all 0.7s ease-in-out;
  }

  .not-scrolled {
    box-shadow: 0 2px 8px rgba(94, 106, 109, 0.5);
    background-color: var(--primary);
  }

  .not-scrolled h1,
  .not-scrolled img#logo {
    display: block;
  }

  .not-scrolled .dropdown-container > button {
    background-color: transparent;
    opacity: 1;
    transform: translateX(0);
  }

  .not-scrolled .dropdown-container > button:hover,
  .not-scrolled .dropdown-container > button:focus {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(0) scale(1.075);
  }

  .not-scrolled .dropdown-content {
    transform: translateX(0);
    border-radius: 0 0 0.5rem 0.5rem;
  }

  header :global(a) {
    height: 56px;
  }

  header h1 {
    display: none;
    margin: 0;
    font-size: 1.5rem;
  }

  img#logo {
    display: none;
    width: 3.5rem;
    height: 3.5rem;
  }

  div.dropdown-container {
    max-height: 2.5rem;
    max-width: 2.5rem;
    align-items: flex-end;
  }

  div.dropdown-container > button {
    background-color: var(--primary);
    opacity: 0.6;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    height: 2.5rem;
    border-radius: 50px;
    transition: all 0.3s ease-in-out;
    transform: translateX(5.5rem);
  }

  div.dropdown-container > button:hover,
  div.dropdown-container > button:focus {
    opacity: 1;
    transform: translateX(5.5rem) scale(1.075);
  }

  nav.dropdown-content {
    position: absolute;
    top: 4.5rem;
    right: 10%;
    width: 8rem;
    z-index: 2;
    background-color: var(--primary);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    transition: all 0.5s ease-in-out;
    transform: translateX(5.5rem);
    overflow: hidden;
  }

  nav.dropdown-content :global(a),
  nav.dropdown-content button {
    display: block;
    text-decoration: none;
    font-size: 1rem;
    color: var(--text);
    text-align: center;
    padding: 0.75rem 1rem;
    height: 1.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  nav.dropdown-content :global(a):hover,
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
