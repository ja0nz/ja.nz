<script context="module" lang="ts">
  import type { LoadInput } from "@sveltejs/kit";
  import type { ParsedIssue, LoadAll } from "src/app";
  import { dev } from "$app/env";
  import { parsed } from "$lib/dev/endpointData";
  export async function load({
    params,
    fetch,
    url,
  }: LoadInput): Promise<LoadAll> {
    const tag = params.slug;
    // TODO
    const anchor = url.searchParams;
    const api = `https://api-ja-nz.janz.workers.dev/v1/parsed`;
    const response = dev ? parsed.clone() : await fetch(api);
    if (!response.ok) return { status: 500 };
    const content: ParsedIssue[] = await response.json();
    if (!content) return { status: 404 };

    return {
      status: response.status,
      cache: { maxage: 60 },
      props: {
        content,
      },
    };
  }
</script>

<script lang="ts">
  export let content: ParsedIssue[];
</script>

<article class="sidebar | wrapper | mobile-sidebar">
  <div class="menu | sticky-header">
    <div class="box">Profileimage & last seen</div>
    <div>Fuzzy tag search</div>
    <div class="overflow-y-auto">
      <!-- {#each tags as tag}
           <div class="box">{tag}</div>
           {/each} -->
    </div>
  </div>
  <div id="not-sidebar" class="no-contentX">
    <div class="key-header | splitter sticky-header">
      <div class="box">⬅ Topic Card Photo blah</div>
      <aside>
        <a href="/:box">Box</a>
        <div>ThemeSwitch</div>
      </aside>
    </div>
    <div style="min-height: 1000px;" class="box">Content Area</div>
    <div class="box">Send me a message</div>
  </div>
</article>
