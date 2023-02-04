<script>
  import { cognitoUser, token } from "../stores";
  import Button from "./Button.svelte";


  const onSignOutClick = async () => {
    cognitoUser.set(undefined);
  };
</script>

<Button color="bg-red-300" label="Sign out" on:click={onSignOutClick} />
