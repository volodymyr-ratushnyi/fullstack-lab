import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './get-all-users.query';
import { UserReadRepository } from '../../../domain/user-read.repository';
import { UserDto } from '../../dtos/user.dto';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(private readonly readRepo: UserReadRepository) {}

  async execute(): Promise<UserDto[]> {
    return this.readRepo.findAll();
  }
}
