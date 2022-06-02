<script lang="ts">
  export let bg: string;
</script>

<div class="this">
  <div style="grid-area: 1 / 1;">
    <slot />
  </div>
  <div style="background: url('{bg}')" class="background" />
</div>

<style>
  .this {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
  .background {
    grid-area: 1 / 1;
    align-self: start;
    height: calc(100vh - var(--content-margin-top, 100px));
    position: sticky;
    z-index: -1;
    top: var(--content-margin-top, 100px);
  }
  :global(#main-content) {
    scroll-margin-top: var(--content-margin-top, 100px);
  }
</style>
