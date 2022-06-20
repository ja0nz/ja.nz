<script lang="ts">
  import AboutCard from "$lib/layout/AboutCard.svelte";
  import TagCard from "$lib/layout/TagCard.svelte";
  const H = "visually-hidden";

  let about = false;
  let self: HTMLElement;
  export function toggleAbout() {
    about = !about;
    const children = self.parentElement?.children;
    for (let toHide of [...(children ?? [])]) {
      if (toHide.classList.contains(H)) {
        toHide.classList.remove(H);
        toHide.inert = false;
      } else {
        toHide.classList.add(H);
        toHide.inert = true;
      }
    }
  }
</script>

{#if about}
  <AboutCard>
    <!-- Slot return -->
    <div slot="return">
      <TagCard>
        <div slot="picture">
          <div aria-label="Return to Tag Feed" class="iconT" on:click={toggleAbout}>C</div>
        </div>
        <div slot="text">
          <div>
            <span>R</span>
            <span>E</span>
            <span>T</span>
            <span>U</span>
            <span>R</span>
            <span>N</span>
          </div>
        </div>
      </TagCard>
    </div>
    <!-- Slot picture -->
    <picture slot="picture">
      <source srcset="profile.webp" />
      <img src="profile.jpg" class="rounded-full" alt="Profile of ja0nz" />
    </picture>
    <!-- Slot text -->
    <div slot="text">
      <div>Hey there, I'm Jan👋</div>
      <div>
        And this is a raw scratchpad/blog/journal about things that make me feel
        curious. Enjoy.
        <ul>
          <li>
            <a href="https://read.cv/ja0nz"><span>read.cv/ja0nz</span></a>
          </li>
          <li>
            <a href="https://github.com/ja0nz"><span>github.com/ja0nz</span></a>
          </li>
          <li>
            <a href="https://codepen.io/ja0nz"><span>codepen.io/ja0nz</span></a>
          </li>
          <li>
            <a href="https://twitter.com/ja0nz"
              ><span>twitter.com/ja0nz</span></a
            >
          </li>
        </ul>
      </div>
    </div>
  </AboutCard>
{:else}
  <TagCard>
    <!-- Slot picture -->
    <div slot="picture">
      <picture>
        <source srcset="profile.webp" />
        <img
          on:click={toggleAbout}
          src="profile.jpg"
          style="cursor: pointer;"
          alt="Profile of ja0nz"
        />
      </picture>
      <div aria-label="More about the creator" class="icon" on:click={toggleAbout}>R</div>
    </div>
    <!-- Slot text -->
    <div slot="text">
      <a href="/">
        <p>ja0nz's blog</p>
      </a>
      <p class="subcontent">join my feed✌️</p>
    </div>
  </TagCard>
{/if}
<div class="contents" bind:this={self} />
