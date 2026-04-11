import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, QueryBus } from '@nestjs/cqrs';
import { CredentialsDto } from 'src/auth/applications/dtos/credentials.dto';
import { TokenService } from 'src/auth/services/token/token.service';
import { Hasher } from 'src/shared/hasher/hasher';
import {
  GetUserByEmailOrUsernameQuery
} from 'src/user/application/queries/get-user-by-email-or-username/get-user-by-email-or-username.query';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginHandler {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly hasher: Hasher,
    private readonly tokenService: TokenService,
  ) {}

  async execute({ emailOrUsername, password }: CredentialsDto) {
    const user = await this.queryBus.execute(new GetUserByEmailOrUsernameQuery(emailOrUsername));
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await this.hasher.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.tokenService.sign({ id: user._id, role: user.role });
  }
}
