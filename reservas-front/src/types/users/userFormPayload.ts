export interface UserFormPayload {
  name: string;
  lastname: string;
  email?: string;
  type: 'ADMIN' | 'CUSTOMER' | 'USER';
  password?: string;
  confirmPassword?: string;
  newPassword?: string,
  avatar?: string;
}

export interface UserCreatePayload extends Omit<UserFormPayload, 'password' | 'confirmPassword'> {
  password: string;
}

export interface UserUpdatePayload {
  name?: string;
  lastname?: string;
  type?: 'ADMIN' | 'CUSTOMER' | 'USER';
  password?: string;
  avatar?: string;
}