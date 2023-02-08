<script lang="ts">
  import { onMount } from "svelte";
  import { apiData, todos, token, type TodoItem } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import AddModal from "./AddModal.svelte";
  import Button from "./Button.svelte";
  import DeleteTodo from "./DeleteTodo.svelte";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  let error = "";

  let currentTodos:TodoItem[] = [];
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
  <Button on:click={openModal} label="Add" />
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
  <table>
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
          <td><DeleteTodo {todoId} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
