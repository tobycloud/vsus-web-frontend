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
  let w = window.open();
  pocketbase.authStore.clear();
  await pocketbase.collection("users").authWithOAuth2({
    provider,
    urlCallback: (url) => {
      if (w) w.location.href = url;
    },
  });
}

export async function userSignUp(data: Object) {
  pocketbase.authStore.clear();
  await pocketbase.collection("users").create(data);
}

export async function getAvatar(user: User) {
  return await pocketbase.getFileUrl(user, user.avatar);
}

export async function getWorkspaces(user: User) {
  return await pocketbase.collection("workspaces").getFullList({
    filter: `owner = "${user.id}"`,
  });
}

export async function getLimitWorkspaces(user: User, min: number, max: number) {
  const listResult = await pocketbase.collection("workspaces").getList(min, max, {
    sort: "-updated",
    filter: `owner = "${user.id}"`,
  });
  return listResult.items;
}
