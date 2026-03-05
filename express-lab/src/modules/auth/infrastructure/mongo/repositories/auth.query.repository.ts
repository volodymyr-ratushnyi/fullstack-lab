import {UserModel} from '../models/user.ts'
import type {AuthQuery} from '../../interfaces/auth.query.repository.interface.ts'

class AuthQueryRepository implements AuthQuery {
  public async getUserByEmailOrUserName(emailOrUserName: string) {
    return UserModel.findOne({
      $or: [
        {email: emailOrUserName},
        {userName: emailOrUserName}
      ]
    })
  }
}

export const authQueryRepository = new AuthQueryRepository()
