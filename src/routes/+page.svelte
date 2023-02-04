<script>
  import Signin from "../components/SignIn.svelte";
  import SignOut from "../components/SignOut.svelte";
  import Todos from "../components/Todos.svelte";
  import { cognitoUser } from "../stores";

  /**
   * @type {import("amazon-cognito-identity-js").CognitoUser | undefined}
   */
  let user = undefined;
  cognitoUser.subscribe((value) => {
    user = value;
  });
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
