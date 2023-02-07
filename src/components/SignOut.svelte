<script lang="ts">
  import { getCurrentUser } from "../lib/auth";
  import { cognitoUser } from "../stores";
  import Button from "./Button.svelte";

  const onSignOutClick = async () => {
    const current = getCurrentUser();
    if (current) {
      current.signOut();
      cognitoUser.set(null);
    }
  };
</script>

<Button color="bg-red-600" label="Sign out" on:click={onSignOutClick} />
