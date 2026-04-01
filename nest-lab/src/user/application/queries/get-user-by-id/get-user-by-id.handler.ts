import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { UserReadRepository } from '../../../domain/user-read.repository';
import { UserDto } from '../../dtos/user.dto';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly readRepo: UserReadRepository) {}

  async execute({ id }: GetUserByIdQuery): Promise<UserDto | null> {
    return this.readRepo.findById(id);
  }
}
