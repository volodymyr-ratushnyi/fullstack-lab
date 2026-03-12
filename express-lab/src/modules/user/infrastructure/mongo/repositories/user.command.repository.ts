import {UserModel} from '@user/infrastructure/mongo/models/user.ts'
import type {UserCommand} from '@user/infrastructure/interfaces/user.command.repository.interface.ts'
import {User} from '@user/domain/user.entity.ts'

class UserCommandRepository implements UserCommand {
  public async createUser(user: User) {
    const userModel = new UserModel(user)
    await userModel.save()
  }
}

export const userCommandRepository = new UserCommandRepository()
