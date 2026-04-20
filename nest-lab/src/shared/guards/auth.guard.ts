import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { JwtTokenService } from '../../auth/services/token/jwt-token.service';
import { Reflector } from '@nestjs/core';
import { Request } from 'express'
import {IS_PUBLIC} from '../decorators/metadata/public.decodator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.signedCookies.tokenl;
    if (!token) {
      throw new UnauthorizedException('Access denied. No token provided');
    }
    try {
      req.jwtPayload = this.jwtTokenService.verify(token);
      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
