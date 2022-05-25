<script context="module" lang="ts">
  import { get } from "svelte/store";
  import { byTagsLatest, filterContent } from "$lib/xform";
  // Pass the `stuff` from __layout into the props of this page
  export async function load({ params, url, stuff }: LoadInput) {
    const tag = params.slug;
    console.log(tag);
    // TODO
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

  import Menu from "../css/blocks/menu.svelte";
  import ContentHeader from "../css/blocks/content-header.svelte";
  import TagCard from "../css/blocks/tag-card.svelte";

  import ThemeSwitch from "$lib/blocks/ThemeSwitch.svelte";
  import ContentSwitch from "$lib/blocks/ContentSwitch.svelte";

  import type { ParsedIssue } from "src/app";
  import { highlightTags, latestTags } from "$lib/xform";
  import { highlightDOMString } from "$lib/highlightDOM";
  import type { LoadInput } from "@sveltejs/kit";
  import { filterFuzzy } from "@thi.ng/transducers";

  // Filter label
  let inputTags: HTMLInputElement;
  const focusSearch = (e: KeyboardEvent) => {
    if (e.key === "/" && inputTags && document.activeElement !== inputTags)
      inputTags.select();
  };
  let tags: IterableIterator<[string, number]>;
  let fuzzyTags = "";
  $: tags = filterFuzzy(
    fuzzyTags,
    { key: (x: [string, number]) => x[0] },
    tagsByLatest
  );
  //-- Filter label finished
  //Filter content
  let cont: IterableIterator<ParsedIssue>;
  let fuzzyContent = "";
  $: cont = filterContent(
    fuzzyContent,
    { key: (x: ParsedIssue) => x.body },
    contentByTag
  );
</script>

<svelte:window on:keyup={focusSearch} />

<article class="sidebar">
  <Menu>
    <!-- Hello me -->
    <TagCard>
      <!-- Slot picture -->
      <picture slot="picture">
        <source srcset="profile.webp" />
        <img src="profile.jpg" class="rounded-full" alt="Profile of ja0nz" />
      </picture>
      <!-- Slot text -->
      <div slot="text">
        <p>ja0nz's blog</p>
        <p class="subcontent">last seen at 11.11.2022</p>
      </div>
    </TagCard>
    <input
      aria-label="Search tags"
      type="text"
      bind:value={fuzzyTags}
      bind:this={inputTags}
      placeholder="Hit / to search"
    />
    <!-- Scrollable, selectable menu col -->
    <div class="overflow-y-auto">
      {#each [...tags] as [tag, ts]}
        <a href={`/:${tag}`}>
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
              <p>{@html highlightTags(tag, fuzzyTags)}</p>
              <p>Last seen</p>
            </div>
          </TagCard>
        </a>
      {/each}
    </div>
  </Menu>
  <div id="not-sidebar">
    <ContentHeader>
      <ContentSwitch />
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
        <input
          aria-label="Search tags"
          type="text"
          bind:value={fuzzyContent}
          placeholder="Search feed"
        />
        <ThemeSwitch />
      </aside>
    </ContentHeader>
    <div style="scroll-margin-top: 120px;" id="main-content" class="box">
      {#each [...cont] as { body }}
        <div class="box">
          {@html highlightDOMString(
            body,
            fuzzyContent,
            (token) => `<span class="underline">${token}</span>`
          )}
        </div>
      {/each}
    </div>
    <div class="box">Send me a message</div>
  </div>
</article>
