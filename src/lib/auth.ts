import { CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js";
import { cognitoUser, token } from "../stores";
import { USER_POOL_ID, CLIENT_ID } from "../utils/constants";

export const getCurrentUser = () => {
  const userPool = new CognitoUserPool({
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID,
  });
  const user = userPool.getCurrentUser();
  return user;
}

export const checkCurrentUser = () => {
  const user = getCurrentUser();
  cognitoUser.set(user);
  if (user) {
    user.getSession((err: unknown, session: CognitoUserSession) => {
      if (err) {
        console.error(err);
        return;
      }
      token.set(session.getIdToken().getJwtToken());
    });
  }
  return user;
}
