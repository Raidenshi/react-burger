export interface IUser {
  email: string;
  name: string;
}

export interface IUserState {
  user: null | IUser;
  userAuthorized: boolean;
  authRequest: boolean;
  registerRequest: boolean;
  loginRequest: boolean;
  passwordRequest: boolean;
  resettingPassword: boolean;
  error: string;
}
