<script lang="ts">
  import { apiData, todos, token, type TodoItem } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import InlineButton from "./InlineButton.svelte";

  export let todoId = "";

  let error = "";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  let currentTodos:TodoItem[] = [];
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
      error = e as string;
    }
  }
</script>

<InlineButton on:click={deleteTodo} label="Delete" className="secondary"/>
{#if error}
  <span>{error}</span>
{/if}
