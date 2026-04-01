import {
  IsString,
  IsEmail,
  Length,
} from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

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
}
