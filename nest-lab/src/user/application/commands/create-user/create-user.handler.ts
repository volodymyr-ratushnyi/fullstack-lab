import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDto } from 'src/user/application/dtos/user.dto';
import { UserReadRepository } from 'src/user/domain/user-read.repository';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../../../domain/user.repository';
import { User } from '../../../domain/user.entity';
import { randomUUID } from 'crypto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userReadRepository: UserReadRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserDto> {
    const { firstName, lastName, userName, email, password } = command;

    const existing = await this.userReadRepository.findByEmail(email);
    if (existing) {
      throw new Error(`User with email ${email} already exists`);
    }

    const user = new User(
      randomUUID(),
      firstName,
      lastName,
      userName,
      email,
      password,
    );
    return this.userRepository.create(user);
  }
}
