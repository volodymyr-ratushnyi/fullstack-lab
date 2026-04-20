import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from 'src/auth/applications/commands/login/login.command';
import { RegisterCommand } from 'src/auth/applications/commands/register/register.command';
import { CredentialsDto } from 'src/auth/applications/dtos/credentials.dto';
import { RegisterDto } from 'src/auth/applications/dtos/register.dto';
import { AppConfigService } from 'src/shared/config/config.service';
import ms from 'ms';
import { Public } from 'src/shared/decorators/metadata/public.decodator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly config: AppConfigService,
    private readonly commandBus: CommandBus,
  ) {}

  @Public()
  @Post()
  register(@Body() dto: RegisterDto) {
    return this.commandBus.execute(
      new RegisterCommand(
        dto.firstName,
        dto.lastName,
        dto.username,
        dto.email,
        dto.password,
      ),
    );
  }

  @Public()
  @Post()
  async login(@Body() dto: CredentialsDto, @Res() res: Response) {
    const token = await this.commandBus.execute(new LoginCommand(
      dto.emailOrUsername,
      dto.password,
    ));
    res.cookie('token', token, {
      signed: true,
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'test',
      sameSite: 'lax',
      maxAge: ms(this.config.jwtExpiresIn),
    });
  }

  @Get()
  logout(@Res() res: Response) {
    res.clearCookie('token', {
      signed: true,
      httpOnly: true,
      secure: this.config.nodeEnv === 'production',
      sameSite: 'lax',
    });
  }
}
