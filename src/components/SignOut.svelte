<script lang="ts">
  import { getCurrentUser } from "../lib/auth";
  import { cognitoUser } from "../stores";
  import Button from "./Button.svelte";
  import InlineButton from "./InlineButton.svelte";

  const onSignOutClick = async () => {
    const current = getCurrentUser();
    if (current) {
      current.signOut();
      cognitoUser.set(null);
    }
  };
</script>

<InlineButton label="Sign out" on:click={onSignOutClick} />
