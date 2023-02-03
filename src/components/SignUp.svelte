<script>
  import {
    USER_POOL_ID,
    CLIENT_ID,
  } from "../lib/auth";
  import {
    CognitoUserPool,
    CognitoUserAttribute,
  } from "amazon-cognito-identity-js";

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

  const onSignUpSubmit = async (e) => {
    const [email, password] = [
      e.currentTarget.email.value,
      e.currentTarget.passwordSignup.value,
    ];
    const attributeEmail = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });
    UserPool.signUp(email, password, [attributeEmail], null, (err, data) => {
      if (err) {
        console.log(err);
        notify(err.message);
      } else {
        notify("user created.");
      }
    });
  };
</script>

<form on:submit|preventDefault={onSignUpSubmit}>
  <label for="email">email</label>
  <input required type="text" id="emailSignup" value="" placeholder="email" />
  <label for="passwordSignup">password</label>
  <input type="password" id="passwordSignup" value="" placeholder="password" />
  <button type="submit">sign up</button>
</form>
