import {UserModel} from '../models/user.ts'
import type {AuthCommand} from '../../interfaces/auth.command.repository.interface.ts'
import {User} from '@auth/domain/user.entity.ts'

class AuthCommandRepository implements AuthCommand {
  public async createUser(user: User) {
    const userModel = new UserModel(user)
    await userModel.save()
  }
}

export const authCommandRepository = new AuthCommandRepository()
