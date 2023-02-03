<script>
  import { token } from "../stores";


  const onSignOutClick = async () => {
    token.set('');
  };
</script>

<button on:click={onSignOutClick}>Sign out</button>
