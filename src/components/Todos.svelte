<script>
  import { stringify } from "postcss";
  import { token } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import Button from "./Button.svelte";
  import DeleteTodo from "./DeleteTodo.svelte";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  /**
   * @type {{todoId: string, name: string}[]}
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
  {#if error}
    <p>Error occured: {error}</p>
  {/if}
  <p>Fetched {todos.length} items</p>
  {#if todos.length}
    <table class="table">
      <thead>
        <th>Id</th>
        <th>Name</th>
        <th />
      </thead>
      <tbody>
        {#each todos as { todoId, name }, i}
          <tr>
            <td>{todoId}</td>
            <td>{name}</td>
            <td><DeleteTodo {todoId} /></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
