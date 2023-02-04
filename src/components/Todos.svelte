<script>
  import { stringify } from "postcss";
import { token } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import Button from "./Button.svelte";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  /**
   * @type {object[]}
   */
  let todos = [];
  let error = "";
  async function getTodos() {
    try {
      error = "";
      const headers = {
        Authorization: `Bearer ${currentToken}`,
      };
      const response = await fetch(`${TODO_ENDPOINT}/get`, {
        headers,
      });
      todos = await response.json();
    } catch (e) {
      error = e;
    }
  }
</script>

<div class="container mx-auto bg-slate-300 shadow border p-8">
  <Button on:click={getTodos} label="Fetch TODOS" />
  <h2>TODOS {JSON.stringify(todos)}</h2>
  {#if error}
    <p>Error occured: {error}</p>
  {/if}
  {#if todos.length}
    <p>Fetched {todos.length} items</p>
  {/if}
  <table>
    <thead>
      <th>Id</th>
      <th>Name</th>
      <th></th>
    </thead>
    <tbody>
      {#each todos as { todoId, name }, i}
      <tr>
        <td>{todoId}</td>
        <td>{i + 1}: {name}</td>
        <td></td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
