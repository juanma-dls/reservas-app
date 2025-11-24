export type UserType = 'ADMIN' | 'CUSTOMER' | 'USER';

export interface UserSearchParams {
  name?: string;
  lastname?: string;
  email?: string;
  type?: UserType;
  deletedUsers?: boolean;
}