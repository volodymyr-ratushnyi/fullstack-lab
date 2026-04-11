import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HasherModule } from 'src/shared/hasher/hasher.module';
import { UserController } from './user.controller';
import {
  UserSchema,
  UserSchemaClass,
} from './infrastructure/schemas/user.schema';
import { UserRepository } from './domain/user.repository';
import { UserReadRepository } from './domain/user-read.repository';
import { UserMongoRepository } from 'src/user/infrastructure/repositories/mongo/user-mongo.repository';
import { UserMongoReadRepository } from 'src/user/infrastructure/repositories/mongo/user-mongo-read.repository';
import { UserPgRepository} from 'src/user/infrastructure/repositories/postgres/user-pg.repository';
import { UserPgReadRepository} from 'src/user/infrastructure/repositories/postgres/user-pg-read.repository';

import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { DeleteUserHandler } from './application/commands/delete-user/delete-user.handler';
import { GetUserByIdHandler } from './application/queries/get-user-by-id/get-user-by-id.handler';
import { GetAllUsersHandler } from './application/queries/get-all-users/get-all-users.handler';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [CreateUserHandler, DeleteUserHandler];
const QueryHandlers = [GetUserByIdHandler, GetAllUsersHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
    HasherModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserMongoRepository /* UserPgRepository */,
    },
    {
      provide: UserReadRepository,
      useClass: UserMongoReadRepository /* UserPgReadRepository */,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class UserModule {}
