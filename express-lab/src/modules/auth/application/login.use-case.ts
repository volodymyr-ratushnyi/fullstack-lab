import type {CredentialsDto} from '@auth/domain/dtos/auth.dto.ts'
import type {Hasher} from '@auth/domain/services/hasher.interface.ts'
import type {TokenService} from '@auth/domain/services/token.interface.ts'
import type {UserQuery} from '@user/infrastructure/interfaces/user.query.repository.interface.ts'

export class LoginUseCase {
  constructor(
    private readonly userQueryRepo: UserQuery,
    private readonly hasher: Hasher,
    private readonly tokenService: TokenService,
  ) {}

  public async execute({emailOrUserName, password}: CredentialsDto) {
    const user = await this.userQueryRepo.getUserByEmailOrUserName(emailOrUserName)
    if (!user) throw  new Error('Invalid credentials')

    const isMatch = await this.hasher.compare(password, user.password)
    if (!isMatch) throw new Error('Invalid credentials')

    return this.tokenService.sign({ id: user._id, role: user.role })
  }
}
