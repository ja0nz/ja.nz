<!-- Left side menubar
     Variables:
       --top-placement -> this
       --bottom-margin-mobile -> the hacky part:)
       --stack-spacing (optional) -> stack.css
     Usage:
     - sticks element to 'top' and ensures 'max-height' to bottom
     - On mobile: prevent double scroll bar and ensure spacing bottom
-->

<div class="this | stack">
  <slot />
</div>

<style>
  .this {
    /* Sticky header with spacing */
    position: sticky;
    /* Max height to ensure vertical screen fit - stay in sync with 'top' */
    top: var(--top-placement);
    max-height: calc(100vh - var(--top-placement) - 1px);

    /* In case its in flex/grid*/
    align-self: start;
  }

  /* Ensure width uniformity */
  .this > :global(*) {
    max-width: calc(var(--sidebar-target-width) - 1px);
  }

  @media (max-width: 1111px) {
    .this {
      max-height: initial;
      /* Ensure spacing to bottom - needed because of the ::before content clip */
      margin-block-end: var(--bottom-margin-mobile);
    }
  }
</style>
