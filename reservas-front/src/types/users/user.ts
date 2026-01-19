export interface User {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  type: 'ADMIN' | 'USER' | 'CUSTOMER';
  permissions: string[];
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: Date | string | null;
  avatarUrl? :string
}