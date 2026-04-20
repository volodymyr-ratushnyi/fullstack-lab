import { Transform } from 'class-transformer';
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
  username: string;

  @IsEmail()
  @Transform(({ value }) => typeof value === 'string'
      ? value.toLowerCase()
      : value,
  )
  email: string;
}
