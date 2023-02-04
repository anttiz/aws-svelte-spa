<script>
  import { token } from "../stores";
  import { TODO_ENDPOINT } from "../utils/constants";
  import Button from "./Button.svelte";

  let currentToken = "";
  token.subscribe((value) => {
    currentToken = value;
  });

  let todos;
  let error = "";
  async function getTodos() {
    try {
      error = "";
      const headers = {
        'Authorization': `Bearer ${currentToken}`
      };
      const response = await fetch(`${TODO_ENDPOINT}/get`, {
        headers,
      });
      const data = await response.json();
    } catch (e) {
      error = e;
    }
  }
</script>

<div class="container mx-auto bg-slate-300 shadow border p-8">
  <Button on:click={getTodos} label="Fetch TODOS" />
  <h1>TODOS</h1>
  {#if todos}
    <p>You fetched {todos}</p>
  {/if}
  {#if error}
    <p>Error occured: {error}</p>
  {/if}
</div>
