import {LoginUseCase} from '@auth/application/login.use-case.ts'
import {RegisterUseCase} from '@auth/application/register.use-case.ts'
import {BcryptHasherService} from '@auth/infrastructure/services/bcrypt-hasher.service.ts'
import {JwtTokenService} from '@auth/infrastructure/services/jwt-token.service.ts'
import {AuthController} from '@auth/presentation/auth.controller.ts'
import {userQueryRepository} from '@db/user'
import {createUser} from '@user/services/user.service.ts'

const hasherService = new BcryptHasherService()
const tokenService = new JwtTokenService()

export const loginUseCase = new LoginUseCase(userQueryRepository, hasherService, tokenService)
export const registerUseCase = new RegisterUseCase(createUser)
export const authController = new AuthController(loginUseCase, registerUseCase)
