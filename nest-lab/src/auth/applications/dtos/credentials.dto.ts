import { IsString, Length } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @Length(2, 40)
  emailOrUsername!: string;

  @IsString()
  @Length(6, 120)
  password!: string;
}
