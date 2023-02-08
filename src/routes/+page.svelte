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

<nav>
  <ul>
    <li><strong>AWS TODO spa</strong></li>
  </ul>
  <ul>
    <!-- <li><a href="#">Link</a></li> -->
    {#if user}
      <li><SignOut /></li>
    {/if}
  </ul>
</nav>
<div class="grid">
  {#if !user}
    <article>
      <Signin />
    </article>
  {:else}
    <article>
      {#if user}
        <Todos />
      {/if}
    </article>
  {/if}
</div>
