import { CreateUserDto } from 'src/user/application/dtos/create-user.dto';
import { UserDto } from 'src/user/application/dtos/user.dto';

export abstract class UserRepository {
  abstract create: (userData: CreateUserDto) => Promise<UserDto>;
  abstract delete: (id: string) => void;
}
