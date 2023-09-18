<script lang="ts">
  import SearchArtistSection from "../lib/Sections/SearchArtistSection.svelte";
  import SearchMusicSection from "../lib/Sections/SearchMusicSection.svelte";
  import { searchQuery } from "../store/music";

  const search = (e) => {
    e.preventDefault();
    searchQuery.set(e.target.value);
  };
</script>

<div class='search'>
  <img src="/src/assets/icons/search.svg" alt="Search" />
  <input type="text" name="search" on:change={search} />
</div>

{#if $searchQuery}
  <SearchMusicSection title="Musics" />
  <SearchArtistSection title="Artists" />
{/if}

<style>
  .search {
    display: flex;
    justify-content: space-between;
  }

  .search input {
    width: 100%;
  }
</style>