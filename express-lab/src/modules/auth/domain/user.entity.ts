import type {UserProps} from '@auth/domain/user.types.ts'

export class User {
  private constructor(props: UserProps) {
    Object.assign(this, props)
  }

  static create(props: UserProps) {
    return new User({...props})
  }
}
