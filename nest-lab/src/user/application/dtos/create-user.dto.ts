import { IsString, IsEmail, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 40)
  firstName: string;

  @IsString()
  @Length(2, 40)
  lastName: string;

  @IsString()
  @Length(2, 40)
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 120)
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message: 'Password need include 1 upper case letter and a single digit',
  })
  password: string;
}
