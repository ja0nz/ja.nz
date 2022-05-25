<script lang="ts">
  import { goto } from "$app/navigation";
  const C = "no-content";
  function backToMain() {
    if (window.innerWidth <= 1100) {
      const content = document.querySelector("#not-sidebar");
      if (content?.classList.contains(C)) {
        content?.classList.remove(C);
      } else {
        content?.classList.add(C);
      }
    }
    goto("/:");
  }
</script>

<button on:click={backToMain}>⬅</button>
