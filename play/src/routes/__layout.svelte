<script>
  import github from "svelte-highlight/styles/github";
</script>

<svelte:head>
  {@html github}
</svelte:head>

<slot />
