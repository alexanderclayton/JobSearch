export type TUser = {
  _id?: string | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  jobs?: string[] | undefined;
  applications?: string[] | undefined;
  iss?: number
  exp?: number
  __v?: number
};

export enum ETab {
  Main = "main",
  Profile = "profile",
  Jobs = "jobs",
  Apps = "apps"
}