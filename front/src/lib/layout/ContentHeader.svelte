<div class="this">
  <slot />
</div>

<style>
  .this {
    /* Sticky header with spacing */
    position: sticky;
    top: var(--space-m);

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
  .this > :global(:first-child::before) {
    content: "";
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='25'%3E%3Cdefs%3E%3Cpattern id='bg1' patternUnits='userSpaceOnUse' width='40' height='50'%3E%3Ctext y='.9em' font-size='20'%3E🚀%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg1)' /%3E%3C/svg%3E");
    position: absolute;
    width: 100%;
    height: 60px;
    top: -60px;
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
