<script>
  import { apiData, todos, token } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import Button from "./Button.svelte";

  export let todoId = "";

  let error = "";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  /**
   * @type {{"todoId": string, "name": string}[]}
   */
  let currentTodos = [];
  todos.subscribe((value) => (currentTodos = value));

  async function deleteTodo() {
    try {
      error = "";
      const headers = {
        Authorization: `Bearer ${currentToken}`,
      };
      const response = await fetch(`${TODO_ENDPOINT}/delete`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({
          todoId,
        }),
      });
      apiData.set(currentTodos.filter((t) => t.todoId !== todoId));
    } catch (e) {
      error = e;
    }
  }
</script>

<Button on:click={deleteTodo} label="Delete" color="bg-red-600" />
{#if error}
  <span>{error}</span>
{/if}
