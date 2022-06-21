<script context="module" lang="ts">
  let inputEl: HTMLInputElement;
  const H = "visually-hidden";
  export function toggleSearch() {
    if (inputEl.classList.contains(H)) {
      inputEl.classList.remove(H);
      inputEl.inert = false;
    } else {
      inputEl.classList.add(H);
      inputEl.inert = true;
    }
  }
</script>

<script lang="ts">
  export let contentByTag: ParsedIssue[];

  import type { ParsedIssue } from "src/app";
  import { highlightDOMString } from "$lib/highlightDOM";
  import { filterContent } from "$lib/xform";
  import StickyBackground from "$lib/layout/StickyBackground.svelte";
  import ContentBubbles from "$lib/layout/ContentBubbles.svelte";
  import { titleNumberP, titleP } from "$lib/paths";

  let content: IterableIterator<ParsedIssue>;
  let fuzzyContent = "";
  $: content = filterContent(
    fuzzyContent,
    { key: (x: ParsedIssue) => x.body },
    contentByTag
  );
</script>

<!-- stack-spacing targeting ContentBubbles -->
<StickyBackground
  bg="bg-tile-dark.png"
  --top-placement="var(--avatar-plus-margin-top)"
  --stack-spacing="var(--space-3xs)"
>
  <input
    aria-label="Search message feed"
    class="visually-hidden"
    style="width: 100%; margin-block-start: var(--space-xs);"
    type="text"
    bind:this={inputEl}
    bind:value={fuzzyContent}
    placeholder="Search feed"
    inert
  />
  <div
    style="scroll-margin-top: var(--avatar-plus-margin-top)"
    id="main-content"
    class="stack"
  >
    {#each [...content] as issue}
      <ContentBubbles title={titleP(issue)} href={`/${titleNumberP(issue)}`}>
        {@html highlightDOMString(
          issue.body,
          fuzzyContent,
          (token) => `<span class="underline">${token}</span>`
        )}
      </ContentBubbles>
    {/each}
  </div>
</StickyBackground>
