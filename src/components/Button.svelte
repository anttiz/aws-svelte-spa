<script>
  export let label = '';
  export let color = 'bg-green-300';
  /**
   * @type {"button" | "submit" | "reset" | null | undefined}
   */
  export let type = 'button';
</script>

<button class="{color} pl-2 pr-2 m-2" {type} on:click>{label}</button>
