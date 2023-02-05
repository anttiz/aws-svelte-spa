<script>
  export let label = '';
  export let color = 'green';
  /**
   * @type {"button" | "submit" | "reset" | null | undefined}
   */
  export let type = 'button';
</script>

<button class="bg-{color}-300 pl-2 pr-2 m-2" {type} on:click>{label}</button>
