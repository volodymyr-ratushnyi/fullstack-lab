import {
  ForbiddenException,
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLE } from '../decorators/metadata/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const role = this.reflector.getAllAndOverride(ROLE, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!role) return true

    const { jwtPayload } = context.switchToHttp().getRequest<Request>();
    if (jwtPayload.role !== role) {
      throw new ForbiddenException('Access forbidden')
    }

    return true;
  }
}
