<div class="this | stack">
  <slot name="return" />
  <slot name="picture" />
  <slot name="text" />
</div>

<style>
  .this :global([slot="picture"] > img) {
    border-radius: 50%;
  }

  .this :global([slot="picture"] .iconT) {
    cursor: pointer;
    font-family: "Anicons";
    font-size: var(--step-4);
    font-variation-settings: "TIME" 1;
    transition: font-variation-settings 0.4s ease;
    &:hover {
      font-variation-settings: "TIME" 100;
    }
  }

  /* Alternating font on hover */
  .this :global([slot="return"] span) {
    font-variation-settings: "wght" var(--display-heading-weight, 900);
    transition: 0.3s cubic-bezier(0.45, 0.05, 0.22, 1.3);
    transition-delay: 0.2s;
  }
  .this :global([slot="return"] span:hover) {
    --display-heading-weight: 300;
    transition-delay: 0s;
  }

  /* Custom bullet points */
  .this :global([slot="text"] li::marker) {
    content: "👉";
  }
</style>
