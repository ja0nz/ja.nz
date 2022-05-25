<div class="this">
  <slot name="picture" />
  <slot name="text" />
</div>

<style>
  .this {
    display: grid;
    align-items: center;
    grid-template-columns: 64px max-content;
    grid-gap: 0.8rem;
    padding: var(--space-step--2);
    /* cursor: pointer; */
  }
  .this:hover {
    background-color: yellow;
  }
  .this :global([slot="picture"] > img) {
    border-radius: 50%;
  }
  .this :global([slot="text"] > :last-child) {
    font-size: var(--space-step--2);
  }
  .this :global([slot="text"] > :first-child) {
    font-size: var(--space-step--1);
  }
</style>
