import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, QueryBus } from '@nestjs/cqrs';
import { CredentialsDto } from 'src/auth/applications/dtos/credentials.dto';
import { JwtTokenService } from 'src/auth/services/token/jwt-token.service';
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
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute({ emailOrUsername, password }: CredentialsDto) {
    const user = await this.queryBus.execute(new GetUserByEmailOrUsernameQuery(emailOrUsername));
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await this.hasher.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.jwtTokenService.sign({ userId: user.id, role: user.role });
  }
}
