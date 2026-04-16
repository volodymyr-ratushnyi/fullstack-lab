import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { UserReadRepository } from 'src/user/domain/user-read.repository';
import { UserPgMapper } from 'src/user/infrastructure/repositories/postgres/user-pg.mapper';

@Injectable()
export class UserPgReadRepository implements UserReadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmailOrUsername(usernameOrEmail: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });
    return user ? UserPgMapper.toDomain(user) : null;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserPgMapper.toDomain(user) : null;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(UserPgMapper.toDomain);
  }
}
