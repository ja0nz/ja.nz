<script lang="ts">
  export let title: string;
  export let href: string;
</script>

<div class="this">
  <h1>{title}</h1>
  <a {href}>{title}</a>
  <!-- <slot /> -->
</div>

<style>
  .this {
    :global(*) {
      @apply text-1-;
    }
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
</style>
