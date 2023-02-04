<script>
  import Signin from "../components/SignIn.svelte";
  import SignOut from "../components/SignOut.svelte";
  import { cognitoUser } from "../stores";

  let user = undefined;
  cognitoUser.subscribe((value) => {
    user = value;
  });
</script>

<svelte:head>
  <title>SvelteKit - Cognito</title>
</svelte:head>

<main>
  <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    <p class="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
    <p class="text-gray-500 text-lg">SvelteKit and Tailwind CSS in action</p>
    {#if user}
      <SignOut />
    {:else}
      <Signin />
      <!-- <SignUp /> -->
    {/if}
  </div>
</main>
