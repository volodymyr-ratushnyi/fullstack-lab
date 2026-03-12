import {UserModel} from '@user/infrastructure/mongo/models/user.ts'
import type {UserQuery} from '@user/infrastructure/interfaces/user.query.repository.interface.ts'

class UserQueryRepository implements UserQuery {
  public async getUsers() {
    return UserModel.find({})
  }

  public async getUserById(id?: string) {
    return UserModel.findOne({_id: id})
  }

  public async getUserByEmailOrUserName(emailOrUserName: string) {
    return UserModel.findOne({
      $or: [
        {email: emailOrUserName},
        {userName: emailOrUserName}
      ]
    })
  }
}

export const userQueryRepository = new UserQueryRepository()
