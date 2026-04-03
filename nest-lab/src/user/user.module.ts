import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import {
  UserSchema,
  UserSchemaClass,
} from './infrastructure/schemas/user.schema';
import { UserRepository } from './domain/user.repository';
import { UserReadRepository } from './domain/user-read.repository';
import { MongoUserRepository } from './infrastructure/repositories/mongo-user.repository';
import { MongoUserReadRepository } from './infrastructure/repositories/mongo-user-read.repository';

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
  ],
  controllers: [UserController],
  providers: [
    { provide: UserRepository, useClass: MongoUserRepository },
    { provide: UserReadRepository, useClass: MongoUserReadRepository },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class UserModule {}
