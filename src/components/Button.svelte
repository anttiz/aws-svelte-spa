<script>
  export let label = "";
  export let color = "bg-green-600";
  export let textColor = "text-white";
  export let borderColor = "border-transparent";
  /**
   * @type {"button" | "submit" | "reset" | null | undefined}
   */
  export let type = "button";
</script>

<button
  class="{color} inline-flex w-full justify-center rounded-md border {borderColor} px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-{color}-700 focus:outline-none focus:ring-2 focus:ring-{color}-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm {textColor}"
  {type}
  on:click
>
  {label}
</button>
