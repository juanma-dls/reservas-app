import type { User } from '@/types/user';
import api from '../api/api';
import type { LoginPayload } from '@/types/auth';

export async function login(payload: LoginPayload) {
  const { data } = await api.post('/auth/login', payload);

  return data;
}

export async function register(user: User) {
  const { data } = await api.post('/auth/register', user);
  return data;
}