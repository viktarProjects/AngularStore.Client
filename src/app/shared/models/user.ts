export interface IToken {
  token: string;
}

export interface IUser {
  userName: string;
  email: string;
  phoneNumber: string;
  role: string[];
  nbf: number;
  exp: number;
  iat: number;
}
