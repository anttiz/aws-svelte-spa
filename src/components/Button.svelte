<script lang="ts">
  export let label = "";
  export let type:"button" | "submit" | "reset" | null | undefined = undefined;
</script>

<button on:click {type}>
  {label}
</button>
