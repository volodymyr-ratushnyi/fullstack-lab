import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from 'src/user/application/commands/update-user/update-user.command';
import { UserReadRepository } from 'src/user/domain/user-read.repository';

import { UserRepository } from '../../../domain/user.repository';

@CommandHandler(UpdateUserCommand)
export class DeleteUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userReadRepository: UserReadRepository,
  ) {}

  async execute({ id, data }: UpdateUserCommand): Promise<void> {
    this.userRepository.update(id, data);
  }
}
