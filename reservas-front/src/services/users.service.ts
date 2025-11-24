import type { User } from '@/types/users/user';
import api from '../api/api';
import type { UserCreatePayload, UserUpdatePayload } from '@/types/users/userFormPayload';
import type { UserSearchParams } from '@/types/users/userSearchParams';

const buildQueryParams = (filters: UserSearchParams): string => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

export async function createUser(data: UserCreatePayload): Promise<User> {
  const { data: user } = await api.post<User>('/users', data); 
  return user;
}

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('/users');
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const { data } = await api.get(`/users/${id}`)
  return data
}

export async function updateUser(id: string, data :UserUpdatePayload): Promise<User> {
  const { data: user } = await api.patch<User>(`/users/${id}`, data);
  return user;
}

export async function remove(id: string): Promise<User> {
  const { data } = await api.delete(`/users/${id}`)
  return data
}

export async function restore(id: string): Promise<User> {
  const { data } = await api.patch(`/users/${id}/restore`)
  return data;
}

export async function findBy(filters: UserSearchParams): Promise<User[]> {
  const queryString = buildQueryParams(filters);
  
  const { data } = await api.get(`/users/find${queryString}`);
  
  return data;
}
