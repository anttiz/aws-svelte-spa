<script>
  import { token } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import Button from "./Button.svelte";

  export let todoId = "";

  let error = "";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  async function deleteTodo() {
    try {
      error = "";
      const headers = {
        Authorization: `Bearer ${currentToken}`
      };
      const response = await fetch(`${TODO_ENDPOINT}/delete`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({
          todoId,
        }),
      });
      console.log(response)
    } catch (e) {
      error = e;
    }
  }
</script>

<Button on:click={deleteTodo} label="Delete" color="red" />
{#if error}
  <span>{error}</span>
{/if}
