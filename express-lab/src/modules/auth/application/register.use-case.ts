import type {RegisterUserDto} from '@auth/domain/dtos/auth.dto.ts'
import type {CreateUserDto} from '@user/domain/dtos/user.dto.ts'

export class RegisterUseCase {
  constructor(
    //TODO: uncomment after refactoring user module
    private readonly createUser: (dto: CreateUserDto) => Promise<void>
    //private readonly createUserUseCase: CreateUserUseCase
  ) {}

  public async execute(dto: RegisterUserDto) {
    await this.createUser(dto)
    //await this.createUserUseCase.execute(dto)
  }
}
