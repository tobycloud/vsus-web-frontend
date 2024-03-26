import PocketBase, { RecordModel } from "pocketbase";
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

export function getUser(id: string) {
  return pocketbase.collection("users").getOne(id, { requestKey: null });
}

export function getAvatar(user: RecordModel | User) {
  return pocketbase.getFileUrl(user, user.avatar);
}

export async function getUserWorkspaces(user: User) {
  return await pocketbase.collection("workspaces").getFullList({
    filter: `owner = "${user.id}"`,
  });
}

export async function createWorkspace(user: User, name: string) {
  return await pocketbase.collection("workspaces").create({
    name,
    owner: user.id,
  });
}

export async function getWorkspace(id: string) {
  return await pocketbase.collection("workspaces").getOne(id);
}

export async function getLimitWorkspaces(user: User, min: number, max: number) {
  const listResult = await pocketbase.collection("workspaces").getList(min, max, {
    sort: "-updated",
    filter: `owner = "${user.id}"`,
    requestKey: null,
  });
  return listResult.items;
}
