<!-- Right side menubar
     Variables:
       --top-placement -> this
       --content-clip -> this
     Usage:
     - sticks element to 'top'
     - clip content with ::before
-->

<div class="this | bg-light dark:bg-dark">
  <slot />
</div>

<style>
  .this {
    /* Sticky header with spacing */
    position: sticky;
    top: var(--top-placement);

    /* In case its in flex/grid*/
    align-self: start;
    /* This is the content clip on the top */
    &::before {
      content: "";
      background-repeat: no-repeat;
      background-color: inherit;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='25'%3E%3Cdefs%3E%3Cpattern id='bg1' patternUnits='userSpaceOnUse' width='40' height='50'%3E%3Ctext y='.9em' font-size='20'%3E🚀%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg1)' /%3E%3C/svg%3E");
      position: absolute;
      width: 100%;
      height: var(--content-clip);
      top: calc(var(--content-clip) * -1);
    }
  }

  /* TODO Should be new component */
  .this {
    display: flex;
    align-items: center;
  }
  .this > :global(aside) {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
</style>
