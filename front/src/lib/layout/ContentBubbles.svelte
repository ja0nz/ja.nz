<script lang="ts">
  export let title: string;
  export let background: string;
  export let summary: string;
  export let href: string;
</script>

<div style="background: {background}" class="this | stack">
  <h2>{title}</h2>
  <div class="content">
    {#if summary.length > 0}
      <p>{summary}</p>
    {:else}
      <slot />
    {/if}
  </div>
  <div class="btm">
    <a {href}>read more</a>
  </div>
</div>

<style>
  .this:nth-child(even) {
    align-self: flex-end;
  }
  .this:nth-child(odd) {
    background-color: lightgreen !important;
  }
  .this {
    max-width: 70%;
    padding: var(--space-2xs);
    border-radius: 10px;
    @apply text-1-;

    :global(h1) {
      @apply text-2;
    }
    :global(h2) {
      @apply text-1;
    }
    :global(h3) {
      @apply text-0;
    }
  }
  .content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
