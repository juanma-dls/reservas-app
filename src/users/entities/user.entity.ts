export class User {
  constructor(
    public id: string,
    public name: string,
    public lastname: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
    public type: 'ADMIN' | 'CUSTOMER' | 'USER',
  ) {}
}
