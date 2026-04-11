import { UserDto } from 'src/user/application/dtos/user.dto';
import { UserMapper } from 'src/user/infrastructure/repositories/user.mapper';
import { UserDocument } from '../../schemas/user.schema';

export class UserMongoMapper extends UserMapper{
  static toDomain(doc: UserDocument): UserDto {
    const user = new UserDto();
    user.id = doc._id.toString();
    user.firstName = doc.firstName;
    user.lastName = doc.lastName;
    user.username = doc.username;
    user.email = doc.email;
    return user;
  }
}
