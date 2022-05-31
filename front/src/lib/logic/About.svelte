<script lang="ts">
  export let toHide: HTMLElement;

  import TagCard from "$lib/layout/TagCard.svelte";
  const H = "visually-hidden";
  const C = "contents";

  let about = false;
  export function toggleAbout() {
    about = !about;
    // Hide other contents
    if (toHide.classList.contains(H)) {
      toHide.classList.remove(H);
      toHide.classList.add(C);
      toHide.inert = false;
    } else {
      toHide.classList.remove(C);
      toHide.classList.add(H);
      toHide.inert = true;
    }
  }
</script>

{#if !about}
  <div>Picture</div>
  <div>About me</div>
  <div>Links</div>
{:else}
  <TagCard>
    <!-- Slot picture -->
    <picture slot="picture">
      <source srcset="profile.webp" />
      <img
        on:click={toggleAbout}
        src="profile.jpg"
        class="rounded-full"
        alt="Profile of ja0nz"
      />
    </picture>
    <!-- Slot text -->
    <div slot="text">
      <a href="/">
        <p>ja0nz's blog</p>
      </a>
      <p class="subcontent">last seen at 11.11.2022</p>
    </div>
  </TagCard>
{/if}

<style>
  img:hover {
    cursor: pointer;
  }
</style>
