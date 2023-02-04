<script>
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
  const notify = (msg, delay = 2000) => {
    notificationMessage = msg;
    setTimeout(() => {
      notificationMessage = "";
    }, delay);
  };
  const UserPool = new CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID,
  });

  const onSignInSubmit = async (e) => {
    const [username, password] = [
      e.currentTarget.username.value,
      e.currentTarget.password.value,
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
  <label for="username">Username</label>
  <input required type="text" id="username" value={TODO_USERNAME} />
  <label for="password">Password</label>
  <input type="password" id="password" value={TODO_PASSWORD} />
  <Button type="submit" label="Sign in" />
  <div>{notificationMessage}</div>
</form>
