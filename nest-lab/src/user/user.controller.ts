import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserCommand } from 'src/user/application/commands/create-user/create-user.command';
import { DeleteUserCommand } from 'src/user/application/commands/delete-user/delete-user.command';
import { UpdateUserCommand } from 'src/user/application/commands/update-user/update-user.command';
import { CreateUserDto } from 'src/user/application/dtos/create-user.dto';
import { GetAllUsersQuery } from 'src/user/application/queries/get-all-users/get-all-users.query';
import { GetUserByIdQuery } from 'src/user/application/queries/get-user-by-id/get-user-by-id.query';
import { UpdateUserDto } from './application/dtos/update-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(
        dto.firstName,
        dto.lastName,
        dto.username,
        dto.email,
        dto.password,
      ),
    );
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.commandBus.execute(new UpdateUserCommand(
      id,
      updateUserDto
    ));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
}
