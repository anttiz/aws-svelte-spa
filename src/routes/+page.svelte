<script lang="ts">
  import type { CognitoUser } from "amazon-cognito-identity-js";
  import { onMount } from "svelte";
  import Signin from "../components/SignIn.svelte";
  import SignOut from "../components/SignOut.svelte";
  import Todos from "../components/Todos.svelte";
  import { checkCurrentUser } from "../lib/auth";
  import { cognitoUser } from "../stores";

  let user: CognitoUser | null;

  onMount(async function () {
    checkCurrentUser();
  });

  cognitoUser.subscribe((value) => (user = value));
</script>

<div class="grid">
  <div>
    {#if user}
    <SignOut />
  {:else}
    <Signin />
  {/if}
  </div>
  <div>
    {#if user}
    <Todos />
  {/if}
  </div>
</div>
