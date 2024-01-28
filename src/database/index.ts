import PocketBase from "pocketbase";
import Constants from "./constants";
import { User } from "./models";

const pocketbase = new PocketBase(Constants.PocketBaseURL);
export default pocketbase;

export async function userSignIn(email: string, password: string) {
  pocketbase.authStore.clear();
  await pocketbase.collection("users").authWithPassword(email, password);
}

export async function userSignInOAuth2(provider: string) {
  pocketbase.authStore.clear();
  await pocketbase.collection("users").authWithOAuth2({ provider });
}

export async function userSignUp(data: Object) {
  pocketbase.authStore.clear();
  await pocketbase.collection("users").create(data);
}

export async function getImageURL(user: User) {
  return await pocketbase.getFileUrl(user, user.avatar);
}

export async function getWorkspaces(user: User) {
  return await pocketbase.collection("workspaces").getFullList({
    filter: `owner = "${user.id}"`,
  });
}
