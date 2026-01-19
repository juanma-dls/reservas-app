import api from '../api/api';
import type { LoginPayload, RegisterRequest } from '@/types/auth';

export async function login(payload: LoginPayload) {
  const { data } = await api.post('/auth/login', payload);

  return data;
}

export async function register(payload: RegisterRequest) {
  const res = await api.post('/auth/register', payload);
  return res.data; // { token, user }
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}