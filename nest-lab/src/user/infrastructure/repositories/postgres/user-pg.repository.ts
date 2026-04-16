import { PrismaService } from 'src/db/prisma/prisma.service';
import { User } from 'src/user/domain/user.entity';
import { UserRepository } from 'src/user/domain/user.repository';
import { UserPgMapper } from './user-pg.mapper';

export class UserPgRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(user: User) {
    const data = UserPgMapper.toPersistence(user);
    await this.prisma.user.create({ data });
  }

  public async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }

  public async update(id: string, data: Partial<User>) {
    await this.prisma.user.update({ where: { id }, data });
  }
}
