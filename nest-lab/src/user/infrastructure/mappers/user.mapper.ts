import { CreateUserDto } from 'src/user/application/dtos/create-user.dto';
import { UserDto } from 'src/user/application/dtos/user.dto';
import { UserDocument } from '../schemas/user.schema';

export class UserMapper {
  static toDomain(doc: UserDocument): UserDto {
    const user = new UserDto()
    user.id = doc._id.toString()
    user.firstName = doc.firstName
    user.lastName = doc.lastName
    user.userName = doc.userName
    user.email = doc.email
    return user
  }

  static toPersistence(user: CreateUserDto): Record<string, unknown> {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      password: user.password,
    };
  }
}
