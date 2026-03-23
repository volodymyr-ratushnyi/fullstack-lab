import {userCommandRepository} from '@db/user'
import {User} from '@user/domain/user.entity.ts'
import type {CreateUserDto} from '@user/domain/dtos/user.dto.ts'
import {hash} from 'bcryptjs'

export const createUser = async (dto: CreateUserDto) => {
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
