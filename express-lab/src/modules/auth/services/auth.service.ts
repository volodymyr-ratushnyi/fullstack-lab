import {config} from '@auth/config/config.ts'
import {createUser} from '@user/services/user.service.ts'
import {compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type {CredentialsDto, RegisterUserDto} from '@auth/dtos/auth.dto.ts'
import {userQueryRepository} from '@db/user'

export const register = async (dto: RegisterUserDto) => {
  await createUser(dto)
}

export const login = async ({emailOrUserName, password}: CredentialsDto) => {
  const user = await userQueryRepository.getUserByEmailOrUserName(emailOrUserName)
  if (!user) throw 'Invalid credentials'

  const isMatch = await compare(password, user.password)
  if (!isMatch) throw 'Invalid credentials'

  return jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
}
