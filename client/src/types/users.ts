export type TUser = {
  _id?: string | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  jobs?: string[] | undefined;
  applications?: string[] | undefined;
};
