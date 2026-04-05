import { UserDto } from 'src/user/application/dtos/user.dto';
import { User } from 'src/user/domain/user.entity';

export abstract class UserRepository {
  abstract create: (userData: User) => Promise<UserDto>;
  abstract delete: (id: string) => void;
}
