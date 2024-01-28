import PocketBase from "pocketbase";
import Constants from "./constants";
import { User } from "./models";

const pocketbase = new PocketBase(Constants.PocketBaseURL);
export default pocketbase;

export async function userSignIn(email: string, password: string) {
  try {
    pocketbase.authStore.clear();
    await pocketbase.collection("users").authWithPassword(email, password);
  } catch (error) {
    throw error;
  }
}

export async function userSignInOAuth2(provider: string) {
  try {
    pocketbase.authStore.clear();
    await pocketbase.collection("users").authWithOAuth2({ provider });
  } catch (error) {
    throw error;
  }
}

export async function userSignUp(data: Object) {
  try {
    pocketbase.authStore.clear();
    await pocketbase.collection("users").create(data);
  } catch (error) {
    throw error;
  }
}

export async function getImageURL(user: User) {
  try {
    return await pocketbase.getFileUrl(user, user.avatar);
  } catch (error) {
    throw error;
  }
}

export async function getWorkspaces(user: User) {
  try {
    return await pocketbase.collection("workspaces").getFullList({
      filter: `owner = "${user.id}"`,
    });
  } catch (error) {
    throw error;
  }
}
