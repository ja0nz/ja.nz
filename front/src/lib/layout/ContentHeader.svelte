<div class="this | sticky top-0">
  <slot />
</div>

<style>
  .this {
    align-items: center;
    display: flex;
  }

  .this :global(> aside) {
    margin-left: auto;
    display: flex;
  }

  .this > :global(:last-child) {
    padding: var(--space-step--1);
  }
  .this > :global(:first-child) {
    padding: var(--space-step--1);
  }
  /*
    /* > * { */
  /*   flex-shrink: 0; */
  /*   margin: 0.2rem 0 0 0.2rem; */
  /* }
 }

  @media (min-width: 48em) {
    .this > :last-child {
    justify-content: flex-end;
    }
 }
 */
</style>
