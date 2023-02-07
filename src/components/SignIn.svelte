<script lang="ts">
  import {
    USER_POOL_ID,
    CLIENT_ID,
    TODO_USERNAME,
    TODO_PASSWORD,
  } from "../utils/constants";
  import {
    CognitoUser,
    CognitoUserPool,
    AuthenticationDetails,
  } from "amazon-cognito-identity-js";
  import { cognitoUser, token } from "../stores";
  import Button from "./Button.svelte";

  let notificationMessage = "";
  const notify = (msg: string, delay = 2000) => {
    notificationMessage = msg;
    setTimeout(() => {
      notificationMessage = "";
    }, delay);
  };
  const UserPool = new CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID,
  });

  const onSignInSubmit = async ({
    currentTarget,
  }: {
    currentTarget: EventTarget;
  }) => {
    const [username, password] = [
      // @ts-ignore
      currentTarget.username?.value,
      // @ts-ignore
      currentTarget.password?.value,
    ];
    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    notificationMessage = "Logging in...";
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        notify("logged in");
        token.set(data.getIdToken().getJwtToken());
        cognitoUser.set(user);
      },
      onFailure: (err) => {
        notify(err.message);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired", data);
      },
    });
  };
</script>

<form on:submit|preventDefault={onSignInSubmit}>
  <label for="username"
    >Username
    <input required type="text" id="username" value={TODO_USERNAME} />
  </label>
  <label for="password"
    >Password
    <input type="password" id="password" value={TODO_PASSWORD} />
  </label>
  <Button label="Sign in" type="submit" />
  <div>{notificationMessage}</div>
</form>
