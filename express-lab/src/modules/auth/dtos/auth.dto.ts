export interface RegisterUserDto {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  confirmPassword: string
}

export interface CredentialsDto {
  emailOrUserName: string
  password: string
}
