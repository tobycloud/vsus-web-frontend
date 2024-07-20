import { RecordModel } from "pocketbase";

export type PBID = string; // PocketBase ID, 15 chars
export type PBFile = string; // PocketBase File, needs to be converted to URL with pocketbase.getFileUrl

export interface User {
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;

  name: string;
  pronouns: string;
  aboutMe: string;
  followers: PBID[];
  following: PBID[];
  location: string;
  organization: string;
  phoneNumber: string;
  phoneNumberVisibility: boolean;

  avatar: string;
  banner: string;
  plan: string;
  badges: string[];
  planVisibility: boolean;
  badgesVisibility: boolean;

  expand: {
    // 1 level deep, remember to fetch with getUser again to expand deeper
    followers?: PBUser[];
    following?: PBUser[];
  };
}

export type PBUser = RecordModel & User;

export interface Workspace {
  name: string; // non-empty
  owner: PBID; // required
  collaborators: PBID[]; // could be empty
  instances: PBID[]; // could be empty

  expand: {
    owner: PBUser;
    collaborators?: PBUser[];
    instances?: PBInstance[];
  };
}

export type PBWorkspace = RecordModel & Workspace;

export interface Instance {
  owner: PBID;
  workspace: PBID;
  name: string;
  docker_id: string;
  on_off: boolean;

  expand: {
    owner: PBUser;
    workspace: PBWorkspace;
  };
}

export type PBInstance = RecordModel & Instance;
