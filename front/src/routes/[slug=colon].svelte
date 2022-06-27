<script context="module" lang="ts">
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import type { LoadEvent } from "@sveltejs/kit";
  import { byTagsLatest, latestTags, str2Hsl } from "$lib/xform";
  // Pass the `stuff` from __layout into the props of this page
  export async function load({ params, url, stuff }: LoadEvent) {
    const tag = params.slug.substring(1);
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
  import SearchContentIcon from "$lib/layout/SearchContentIcon.svelte";
</script>

<svelte:head>
  {#if $page.params.slug.length == 1}
    <title>ja0nz'z blog</title>
    <meta name="description" content="This page contains all articles" />
  {:else}
    <title>ja0nz - {$page.params.slug.substring(1)} category</title>
    <meta
      name="description"
      content="This page contains articles tagged with {$page.params.slug.substring(
        1
      )}"
    />
  {/if}
</svelte:head>

<article class="sidebar">
  <!-- css/blocks/menu.svelte -->
  <Menu
    --stack-spacing="var(--space-xs)"
    --top-placement="var(--space-m)"
    --bottom-margin-mobile="var(--sticker-width, 60px)"
  >
    <About />
    <!-- Scrollable, selectable menu col -->
    <TagFeed {tagsByLatest} />
  </Menu>
  <div id="main-content">
    <ContentHeader
      --top-placement="var(--space-m)"
      --content-clip="var(--sticker-width, 60px)"
    >
      <TagCard>
        <!-- Slot picture -->
        <svg
          slot="picture"
          viewBox="0 0 100 100"
          fill={str2Hsl($page.params.slug.substring(1))}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <!-- Slot text -->
        <div slot="text">
          {#if $page.params.slug.length == 1}
            <p>@ll</p>
          {:else}
            <p>{$page.params.slug.substring(1)}</p>
          {/if}
        </div>
      </TagCard>
      <aside class="flex items-center ml-auto">
        <SearchContentIcon action={toggleSearch} />
        <ThemeSwitch />
      </aside>
    </ContentHeader>
    <ContentFeed {contentByTag} />
  </div>
</article>
