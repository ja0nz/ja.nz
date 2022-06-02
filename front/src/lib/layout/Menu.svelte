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
    /* Max height to ensure vertical screen fit - stay in sync with 'top' */
    top: var(--space-m);
    max-height: calc(100vh - var(--space-m));

    align-self: start;
    overflow-y: hidden;
  }

  @media (max-width: 1111px) {
    .this {
      max-height: none;
      /* Ensure spacing to bottom - needed because of the ::before content clip */
      margin-block-end: var(--sticker-width, 60px);
    }
  }
</style>
