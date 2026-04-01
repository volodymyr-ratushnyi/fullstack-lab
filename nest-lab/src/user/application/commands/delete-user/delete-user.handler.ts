import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserReadRepository } from 'src/user/domain/user-read.repository';
import { DeleteUserCommand } from './delete-user.command';
import { UserRepository } from '../../../domain/user.repository';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userReadRepository: UserReadRepository,
  ) {}

  async execute({ id }: DeleteUserCommand): Promise<void> {
    const user = await this.userReadRepository.findById(id);
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    this.userRepository.delete(id);
  }
}
