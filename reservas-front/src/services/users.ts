import type { User } from '@/types/user';
import api from '../api/api';

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('/users');
  return data;
}

export async function getUserById(id: string) {
  const { data } = await api.get(`/users/${id}`)
  return data
}
