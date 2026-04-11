export class User {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role?: string,
    public readonly isVerified?: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
