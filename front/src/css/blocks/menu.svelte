<!-- Left side
     - sticks to top
     - contains the greeter, tag search and tag selection
-->

<div class="this | sticky top-0">
  <slot />
</div>

<style>
  .this {
    /* Max height to ensure vertical screen fit */
    max-height: calc(100vh - 1px);
    overflow-y: hidden;
  }

  @media (max-width: 1111px) {
    .this {
      max-height: none;
    }
  }

  .this {
    display: flex;
    flex-direction: column;
  }
  /* .this :global([slot="select"] > img) {
    border-radius: 50%;
    } */
</style>
