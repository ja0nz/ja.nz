<script lang="ts">
  export let title: string;
  export let background: string;
  export let summary: string | undefined;
  export let href: string;
</script>

<div style="background: {background}" class="this | stack">
  <h1>{title}</h1>
  {#if summary}
    <h2>{summary}</h2>
  {/if}
  <div class="content">
    <slot />
  </div>
  <div class="btm">
    <a {href}>read more</a>
  </div>
</div>

<style>
  .this:nth-child(even) {
    align-self: flex-end;
    background-color: var(--bg-bubble-even) !important;
  }
  .this:nth-child(odd) {
    background-color: var(--bg-bubble-odd) !important;
  }
  .this {
    max-width: 70%;
    padding: var(--space-2xs);
    border-radius: 10px;
    @apply text-1-;

    :global(h1) {
      @apply text-1;
    }
    :global(h2) {
      @apply text-0;
    }
    :global(h3) {
      @apply text-1-;
    }
  }
  .content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
