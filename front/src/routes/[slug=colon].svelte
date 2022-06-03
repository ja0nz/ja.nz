<script context="module" lang="ts">
  import { get } from "svelte/store";
  import type { LoadEvent } from "@sveltejs/kit";
  import { byTagsLatest, latestTags } from "$lib/xform";
  // Pass the `stuff` from __layout into the props of this page
  export async function load({ params, url, stuff }: LoadEvent) {
    const tag = params.slug;
    // TODO Anchor params
    const anchor = url.searchParams;
    return {
      props: {
        ...stuff,
        contentByTag: byTagsLatest(tag, get(stuff.ALL)),
        tagsByLatest: latestTags(get(stuff.ALL)),
      },
    };
  }
</script>

<script lang="ts">
  // import type { Writable } from "svelte/store";
  // export let ALL: Writable<ParsedIssue[]>;
  export let contentByTag: ParsedIssue[];
  export let tagsByLatest: [string, number][];

  import type { ParsedIssue } from "src/app";

  import Menu from "$lib/layout/Menu.svelte";
  import ContentHeader from "$lib/layout/ContentHeader.svelte";
  import TagCard from "$lib/layout/TagCard.svelte";

  import ContentFeed, { toggleSearch } from "$lib/logic/ContentFeed.svelte";
  import ThemeSwitch from "$lib/logic/ThemeSwitch.svelte";
  import TagFeed from "$lib/logic/TagFeed.svelte";
  import About from "$lib/logic/About.svelte";
</script>

<article class="sidebar">
  <!-- css/blocks/menu.svelte -->
  <Menu
    --stack-spacing="1rem"
    --top-placement="var(--space-m)"
    --bottom-margin-mobile="var(--sticker-width, 60px)"
  >
    <About />
    <!-- Scrollable, selectable menu col -->
    <TagFeed {tagsByLatest} />
  </Menu>
  <div id="not-sidebar">
    <ContentHeader
      --top-placement="var(--space-m)"
      --sticker-width="var(--sticker-width, 60px)"
    >
      <TagCard>
        <!-- Slot picture -->
        <svg
          slot="picture"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <!-- Slot text -->
        <div slot="text">
          <p>Topic Card Photo blah</p>
        </div>
      </TagCard>
      <aside>
        <button on:click={toggleSearch}>Looking glass</button>
        <ThemeSwitch />
      </aside>
    </ContentHeader>
    <ContentFeed {contentByTag} />
  </div>
</article>
