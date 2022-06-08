<div class="this | stack">
  <slot name="return" />
  <slot name="picture" />
  <slot name="text" />
</div>

<style>
  .this {
    max-width: 300px;
  }
  .this :global([slot="picture"] > img) {
    border-radius: 50%;
  }
  /* TODO Set studio font*/
  .this :global([slot="return"] span) {
    font-variation-settings: "wght" var(--display-heading-weight, 900);
    transition: 0.3s cubic-bezier(0.45, 0.05, 0.22, 1.3);
    transition-delay: 0.2s;
  }
  .this :global([slot="return"] span:hover) {
    --display-heading-weight: 300;
    transition-delay: 0s;
  }
</style>
