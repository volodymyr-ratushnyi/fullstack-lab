import type {UserType} from '@user/infrastructure/mongo/models/user.ts'

export interface UserQuery {
  getUsers: () => Promise<UserType[]>
  getUserById: (id?: string) => Promise<UserType | null>
  getUserByEmailOrUserName: (emailOrUserName: string) => Promise<UserType | null>
}
