<script>
  import { cognitoUser, token } from "../stores";


  const onSignOutClick = async () => {
    cognitoUser.set(undefined);
  };
</script>

<button on:click={onSignOutClick}>Sign out</button>
