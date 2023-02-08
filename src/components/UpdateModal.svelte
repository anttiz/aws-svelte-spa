<script lang="ts">
  import type { TodoItem } from "../stores";
  import InlineButton from "./InlineButton.svelte";

  export let onCancel: () => void;
  export let onUpdate: (item: TodoItem) => void;
  export let visible: boolean;
  export let item: TodoItem;

  let name: string = item.name;
</script>

<dialog open={visible || undefined}>
  <article>
    <h3>Update TODO</h3>
    {#if item}
      <form>
        <label for="name"
          >Name
          <input required type="text" id="name" bind:value={name} />
        </label>
      </form>
    {/if}
    <footer>
      <InlineButton
        className="secondary"
        label="Cancel"
        on:click={() => onCancel()}
      />
      <InlineButton
        label="Update"
        on:click={() =>
          onUpdate({
            ...item,
            name,
          })}
      />
    </footer>
  </article>
</dialog>
