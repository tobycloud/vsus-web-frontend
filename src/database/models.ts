export interface User {
  id: string;
  verified: boolean;
  username: string;
  email: string;
  emailVisibility: boolean;
  name: string;
  aboutMe: string;
  avatar: string;
  pronouns: string;
  created: string;
  phoneNumber: string;
  phoneNumberVisibility: boolean;
  plan: string;
  location: string;
  organization: string;
  planVisibility: boolean;
  badgesVisibility: boolean;
  badges: string[];
  followers: User[];
  rawFollowers: string[];
  following: User[];
  rawFollowing: string[];
  commonFollowing: { [key: string]: User[] };
  expanded: boolean;
} // khai tử these things soon

// export interface Workspace {
//   id: string;
//   owner: User;
//   collaborators: User[];
//   name: string;
//   created: string;
//   updated: string;
// }
