import type { User } from './users/user';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterPayload {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}