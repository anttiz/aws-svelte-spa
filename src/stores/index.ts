import type { CognitoUser } from "amazon-cognito-identity-js";
import { writable } from "svelte/store";

export const token = writable("");

export const cognitoUser = writable<CognitoUser | undefined>(undefined);
