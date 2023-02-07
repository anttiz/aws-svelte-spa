<script lang="ts">
  import InlineButton from "./InlineButton.svelte";

  export let onCancel: () => void;
  export let onAdd: ({ name }: { name: string }) => void;
  export let visible = false;

  let name = "";
</script>

<dialog open={visible || undefined}>
  <article>
    <h3>Add new TODO</h3>
    <form>
      <label for="name"
        >Name
        <input required type="text" id="name" bind:value={name} />
      </label>
    </form>
    <footer>
      <InlineButton
        href="#cancel"
        className="secondary"
        label="Cancel"
        on:click={() => onCancel()}
      />
      <InlineButton
        href="#add"
        label="Add"
        on:click={() =>
          onAdd({
            name,
          })}
      />
    </footer>
  </article>
</dialog>
