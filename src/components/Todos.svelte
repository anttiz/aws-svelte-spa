<script lang="ts">
  import { onMount } from "svelte";
  import { apiData, todos, token, type TodoItem } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import AddModal from "./AddModal.svelte";
  import DeleteTodo from "./DeleteTodo.svelte";
  import InlineButton from "./InlineButton.svelte";
  import UpdateModal from "./UpdateModal.svelte";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  let error = "";

  let currentTodos: TodoItem[] = [];
  todos.subscribe((value) => (currentTodos = value));

  onMount(async function () {
    try {
      error = "";
      const headers = {
        Authorization: `Bearer ${currentToken}`,
      };
      const response = await fetch(`${TODO_ENDPOINT}/get`, {
        headers,
      });
      const data = await response.json();
      apiData.set(data);
    } catch (e) {
      error = e as string;
    }
  });

  let visible = false;
  const openModal = () => {
    visible = true;
  };

  let updateVisible = false;
  let currentItem: TodoItem | undefined = undefined;
  const openUpdateModal = (todoId: string) => {
    currentItem = currentTodos.find((todo) => todo.todoId === todoId);
    updateVisible = true;
  };

  const addTodo = async (name: string) => {
    try {
      error = "";
      const headers = {
        Authorization: `Bearer ${currentToken}`,
      };
      const response = await fetch(`${TODO_ENDPOINT}/create`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name,
        }),
      });
      const data = await response.json();
      apiData.set([...currentTodos, data]);
    } catch (e) {
      error = e as string;
    }
  };
</script>

<div>
  {#if error}
    <p>Error occured: {error}</p>
  {/if}
  <InlineButton on:click={openModal} label="Add new TODO" />
  <AddModal
    {visible}
    onCancel={() => {
      visible = false;
    }}
    onAdd={({ name }) => {
      addTodo(name);
      visible = false;
    }}
  />
  {#if currentItem}
  <UpdateModal
    visible={updateVisible}
    item={currentItem}
    onCancel={() => {
      updateVisible = false;
    }}
    onUpdate={(item) => {
      console.log('updated item', item)
      if (currentItem) {
        currentItem.name = item.name;
      }
      updateVisible = false;
    }}
  />
  {/if}
  <table role="grid">
    <thead>
      <th>Id</th>
      <th>Name</th>
      <th />
    </thead>
    <tbody>
      {#each currentTodos as { todoId, name }, i}
        <tr>
          <td>{todoId}</td>
          <td>{name}</td>
          <td
            ><InlineButton
              on:click={() => openUpdateModal(todoId)}
              label="Update"
              className="primary"
            />
            <DeleteTodo {todoId} /></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
