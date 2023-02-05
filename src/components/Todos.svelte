<script>
  import { onMount } from "svelte";
  import { apiData, todos, token } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import DeleteTodo from "./DeleteTodo.svelte";

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

  onMount(async function getTodos() {
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
</script>

<div class="container mx-auto bg-slate-300 shadow border p-8">
  {#if error}
    <p>Error occured: {error}</p>
  {/if}
  <table class="table">
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
