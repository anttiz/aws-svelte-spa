<script>
  import { cognitoUser, token } from "../stores";
  import Button from "./Button.svelte";


  const onSignOutClick = async () => {
    cognitoUser.set(undefined);
  };
</script>

<Button color="red" label="Sign out" on:click={onSignOutClick} />
