import { UserDto } from 'src/user/application/dtos/user.dto';

export abstract class UserReadRepository {
  abstract findByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<UserDto | null>;
  abstract findByEmail(email: string): Promise<UserDto | null>;
  abstract findById(id: string): Promise<UserDto | null>;
  abstract findAll(): Promise<UserDto[]>;
}
