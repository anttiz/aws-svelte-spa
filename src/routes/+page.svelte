<script>
  import { onMount } from "svelte";
  import Signin from "../components/SignIn.svelte";
  import SignOut from "../components/SignOut.svelte";
  import Todos from "../components/Todos.svelte";
  import { checkCurrentUser } from "../lib/auth";
  import { cognitoUser } from "../stores";

  /**
   * @type {import("amazon-cognito-identity-js").CognitoUser | null}
   */
  let user;

  onMount(async function () {
    checkCurrentUser();
  });

  cognitoUser.subscribe((value) => user = value);
</script>

<div class="container mx-auto bg-slate-300 shadow border p-8">
  {#if user}
    <SignOut />
  {:else}
    <Signin />
  {/if}
</div>
{#if user}
  <Todos />
{/if}
