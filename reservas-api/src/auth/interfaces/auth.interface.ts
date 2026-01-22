export interface AuthTokenResult {
  email: string;
  type: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  email: string;
  type: string;
  isExpired: boolean;
}
