<script>
  import "../app.css";
</script>

<svelte:head>
  <title>SvelteKit - Cognito</title>
</svelte:head>

<main>
  <div class="container mx-auto bg-gray-200 rounded-t-lg shadow border p-8 mt-10">
    <p class="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
    <p class="text-gray-500 text-lg">AWS TODO SPA</p>
  </div>
  <slot />
</main>
