import PocketBase, { ListResult, RecordListOptions } from "pocketbase";
import { PBInstance, PBUser, PBWorkspace, User } from "./models";

const pocketbase = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
export default pocketbase;

export async function userSignIn(email: string, password: string) {
  pocketbase.authStore.clear();
  await pocketbase.collection("users").authWithPassword(email, password);
}

export async function userSignInOAuth2(provider: string) {
  const w = window.open();
  pocketbase.authStore.clear();
  await pocketbase.collection("users").authWithOAuth2({
    provider,
    urlCallback: (url) => {
      if (w) w.location.href = url;
    },
  });
}

// TODO: actually use User with proper optional fields
export async function userSignUp(data: any) {
  pocketbase.authStore.clear();
  await pocketbase.collection("users").create(data);
}

export async function getUser(id: string): Promise<PBUser> {
  return pocketbase.collection<PBUser>("users").getOne(id, { expand: "followers,following" });
}

export async function getUserByUsername(username: string): Promise<PBUser> {
  return pocketbase.collection<PBUser>("users").getFirstListItem(`username = "${username}"`, { expand: "followers,following" });
}

export function getAvatar(user: User): string {
  return pocketbase.getFileUrl(user, user.avatar);
}

export async function getUserWorkspaces(
  user: PBUser,
  options?: RecordListOptions & { page?: number; perPage?: number }
): Promise<ListResult<PBWorkspace>> {
  return await pocketbase
    .collection<PBWorkspace>("workspaces")
    .getList(options?.page ?? 0, options?.perPage ?? 500, { filter: `owner = "${user.id}"`, expand: "owner,collaborators,instances", ...options });
}

export async function createWorkspace(user: PBUser, name: string): Promise<PBWorkspace> {
  return await pocketbase.collection<PBWorkspace>("workspaces").create({ name, owner: user.id }, { expand: "owner,collaborators,instances" });
}

export async function getWorkspace(id: string): Promise<PBWorkspace> {
  return await pocketbase.collection<PBWorkspace>("workspaces").getOne(id, { expand: "owner,collaborators,instances" });
}

export async function addInstanceToWorkspace(workspace: PBWorkspace, instance: PBInstance) {
  await pocketbase.collection<PBWorkspace>("workspaces").update(workspace.id, { instances: [...workspace.instances, instance.id] });
}

export async function createInstance(user: PBUser, name: string, workspace: string): Promise<PBInstance> {
  return await pocketbase.collection<PBInstance>("instances").create({ name, owner: user.id, workspace }, { expand: "owner,workspace" });
}

export async function getInstance(id: string): Promise<PBInstance> {
  return await pocketbase.collection<PBInstance>("instances").getOne(id, { expand: "owner,workspace" });
}
