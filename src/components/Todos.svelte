<script>
  import { onMount } from "svelte";
  import { apiData, todos, token } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import Button from "./Button.svelte";
  import DeleteTodo from "./DeleteTodo.svelte";
  import Modal from "./Modal.svelte";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  let error = "";

  /**
   * @type {{"todoId": string, "name": string}[]}
   */
  let currentTodos = [];
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
      error = e;
    }
  });

  let visible = false;
  const addTodo = () => {
    visible = true;
  }
</script>

<div class="container mx-auto bg-slate-300 shadow border p-8">
  {#if error}
    <p>Error occured: {error}</p>
  {/if}
  <Button on:click={addTodo} label="Add" />
  <Modal visible={visible} onClose={() => {
    visible = false;
  }} />
  <table class="table-auto border border-spacing-1">
    <thead>
      <th class="border border-spacing-1">Id</th>
      <th class="border border-spacing-1">Name</th>
      <th class="border border-spacing-1" />
    </thead>
    <tbody>
      {#each currentTodos as { todoId, name }, i}
        <tr>
          <td class="border border-spacing-1">{todoId}</td>
          <td class="border border-spacing-1">{name}</td>
          <td class="border border-spacing-1"><DeleteTodo {todoId} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
