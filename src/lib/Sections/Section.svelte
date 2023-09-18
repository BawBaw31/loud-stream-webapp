<script lang="ts">
  import { Link } from "svelte-navigator";

  export let title: string;
  export let seeMoreLink: string | null = null;
</script>

<section>
  <div class="section-header">
    <h2>{title}</h2>
    {#if seeMoreLink}
      <Link to={seeMoreLink}>See More</Link>
    {/if}
  </div>
  <div class="section-content">
    <slot />
  </div>
</section>

<style>
  section {
    display: grid;
    grid-gap: 1rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section-header h2 {
    margin: 0;
  }

  .section-header :global(a) {
    color: var(--primary);
    text-decoration: none;
    font-size: 0.8rem;
  }

  .section-header :global(a):hover {
    text-decoration: underline;
  }

  .section-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(11.5rem, 1fr));
    grid-gap: 1rem;
  }
</style>
