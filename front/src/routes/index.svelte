<script>
  import { browser, dev } from "$app/env";
  // start scrolled down
  browser && window.scrollTo(0, document.body.scrollHeight);
  let tags = ["typescript", "purescript", "nixOS"];
  //let tags = ["typescript", "purescript", "nixOS", "typescript", "purescript", "nixOS", "typescript", "purescript", "nixOS", "typescript", "purescript", "nixOS"];
</script>

<article class="sidebar | mobile-sidebar">
  <div class="menu | sticky-header">
    <div class="box">Profileimage & last seen</div>
    <div>Fuzzy tag search</div>
    <div class="overflow-y-auto">
      {#each tags as tag}
        <div class="box">{tag}</div>
      {/each}
    </div>
  </div>
  <div id="not-sidebar" class="no-contentX">
    <div class="key-header | splitter sticky-header">
      <div class="box">⬅ Topic Card Photo blah</div>
      <aside>
        <div>Search</div>
        <div>ThemeSwitch</div>
      </aside>
    </div>
    <div style="min-height: 1000px;" class="box">
      Content Area
    </div>
    <div class="box">
      Send me a message
    </div>
  </div>
</article>
