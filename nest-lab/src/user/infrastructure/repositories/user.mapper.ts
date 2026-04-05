import { CreateUserDto } from 'src/user/application/dtos/create-user.dto';
import { User } from 'src/user/domain/user.entity';

export class UserMapper {
  static toPersistence(user: User): CreateUserDto {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      password: user.password,
    };
  }
}
