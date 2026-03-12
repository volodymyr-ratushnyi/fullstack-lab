import type {User} from '@user/domain/user.entity.ts'

export interface UserCommand {
  createUser: (userData: User) => void
}
