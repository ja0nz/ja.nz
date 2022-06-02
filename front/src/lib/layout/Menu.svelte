<!-- Left side
     - sticks to top
     - contains the greeter, tag search and tag selection
-->

<div class="this | stack">
  <slot />
</div>

<style>
  .this {
    /* Sticky header with spacing */
    position: sticky;
    top: var(--space-m);
    align-self: start;

    /* Max height to ensure vertical screen fit */
    max-height: calc(100vh - 1px);
    overflow-y: hidden;
  }

  @media (max-width: 1111px) {
    .this {
      max-height: none;
    }
  }
</style>
