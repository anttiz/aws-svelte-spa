import type { CognitoUser } from "amazon-cognito-identity-js";
import { derived, writable } from "svelte/store";

type TodoItem = {
  todoId: string;
  name: string;
}

export const token = writable("");

export const cognitoUser = writable<CognitoUser | undefined>(undefined);

export const apiData = writable<TodoItem[]>([]);

export const todos = derived(apiData, ($apiData) => {
  // transformations
  return $apiData;
});
