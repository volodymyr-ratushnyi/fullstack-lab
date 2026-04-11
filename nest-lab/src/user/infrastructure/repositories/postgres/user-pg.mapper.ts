import { User } from '@prisma/client';
import { UserDto } from 'src/user/application/dtos/user.dto';
import { UserMapper } from 'src/user/infrastructure/repositories/user.mapper';

export class UserPgMapper extends UserMapper {
  static toDomain(user: User): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.username = user.username;
    dto.email = user.email;
    return dto;
  }
}
