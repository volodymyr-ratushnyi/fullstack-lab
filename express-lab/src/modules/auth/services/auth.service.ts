import {config} from '@auth/config/config.ts'
import {compare, hash} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {User} from '@user/domain/user.entity.ts'
import type {CredentialsDto, RegisterUserDto} from '@auth/dtos/auth.dto.ts'
import {userCommandRepository, userQueryRepository} from '@db/user'

export const register = async (dto: RegisterUserDto) => {
  const password = await hash(dto.password, 10)
  const user = User.create({
    firstName: dto.firstName,
    lastName: dto.lastName,
    userName: dto.userName,
    email: dto.email,
    password,
    role: 'user',
    createdAt: new Date()
  })
  await userCommandRepository.createUser(user)
}

export const login = async ({emailOrUserName, password}: CredentialsDto) => {
  const user = await userQueryRepository.getUserByEmailOrUserName(emailOrUserName)
  if (!user) throw 'Invalid credentials'

  const isMatch = await compare(password, user.password)
  if (!isMatch) throw 'Invalid credentials'

  return jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
}
