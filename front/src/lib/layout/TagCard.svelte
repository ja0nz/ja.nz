<div class="this">
  <slot name="picture" />
  <slot name="text" />
</div>

<style>
  .this {
    display: grid;
    align-items: center;
    /* first col defines size of avatar */
    grid-template-columns: var(--avatar-size) max-content;
    grid-template-rows: var(--avatar-size);
    grid-gap: var(--space-xs);
    /* Padding around card */
    padding: var(--space-3xs);
    /* cursor: pointer; */
  }
  .this :global([slot="picture"] img) {
    border-radius: 50%;
    height: var(--avatar-size);
    width: var(--avatar-size);
  }
  /* Icon overlay */
  .this :global([slot="picture"]) {
    display: grid;
  }
  .this :global([slot="picture"] > *) {
    grid-area: 1 / 1;
  }

  .this :global([slot="picture"] .icon) {
    cursor: pointer;
    color: red;
    opacity: 50%;
    font-family: "Anicons";
    font-size: var(--step-3);
    font-variation-settings: "TIME" 100;
    transition: font-variation-settings 0.4s ease;
    &:hover {
      font-variation-settings: "TIME" 1;
    }
  }

  /* Fitting text */
  .this :global([slot="text"] > :last-child) {
    font-size: var(--step--1);
  }
  .this :global([slot="text"] > :first-child) {
    font-size: var(--step-0);
  }
</style>
