import { UpdateUserDto } from 'src/user/application/dtos/update-user.dto';

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateUserDto
  ) {}
}
