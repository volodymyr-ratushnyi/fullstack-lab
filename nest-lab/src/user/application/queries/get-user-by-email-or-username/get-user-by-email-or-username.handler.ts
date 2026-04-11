import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserDto } from 'src/user/application/dtos/user.dto';
import { UserReadRepository } from 'src/user/domain/user-read.repository';
import { GetUserByEmailOrUsernameQuery } from './get-user-by-email-or-username.query';

@QueryHandler(GetUserByEmailOrUsernameQuery)
export class GetUserByEmailOrUsernameHandler implements IQueryHandler<GetUserByEmailOrUsernameQuery> {
  constructor(private readonly readRepo: UserReadRepository) {}

  async execute({ emailOrUsername }: GetUserByEmailOrUsernameQuery): Promise<UserDto | null> {
    return this.readRepo.findByEmailOrUsername(emailOrUsername);
  }
}
