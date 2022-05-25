<div class="this | sticky-header">
  <slot />
</div>

<style>
  .this {
    max-height: calc(100vh - 2 * var(--space-size-2));
    display: flex;
    flex-direction: column;
  }
  /* .this :global([slot="select"] > img) {
    border-radius: 50%;
    } */
</style>
