<script lang="ts">
  export let label = "";
  export let href = "#";
  export let className: 'primary' | 'secondary' | undefined = undefined;
</script>

<a {href} class={className} role="button" on:click>{label}</a>
