import type {User} from '@auth/domain/user.entity.ts'

export interface AuthCommand {
  createUser: (userData: User) => void
}
