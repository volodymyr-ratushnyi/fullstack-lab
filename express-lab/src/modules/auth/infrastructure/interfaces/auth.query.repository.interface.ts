import type {UserType} from '@auth/infrastructure/mongo/models/user.ts'

export interface AuthQuery {
  getUserByEmailOrUserName: (emailOrUserName: string) => Promise<UserType | null>
}
