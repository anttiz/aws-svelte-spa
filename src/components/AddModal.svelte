<script lang="ts">
  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";

  export let onCancel: () => void;
  export let onAdd: ({ name }: { name: string }) => void;
  export let visible = false;

  let name = "";
</script>

{#if visible}
  <Modal>
    <form class="">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div>
          <div>
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Add new TODO
            </h3>
            <div class="">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="name"
              >
                Name
              </label>
              <input
                bind:value={name}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          on:click={() =>
            onAdd({
              name,
            })}
          label="Add"
        />
        <Button
          color="bg-white"
          textColor="text-gray-600"
          borderColor="bg-gray-200"
          on:click={() => onCancel()}
          label="Cancel"
        />
      </div>
    </form>
  </Modal>
{/if}
