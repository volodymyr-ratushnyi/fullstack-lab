import { IsString, IsEmail, Matches } from 'class-validator';

export class MailDto {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;

  @IsString()
  @Matches(/<[^>]*>/, { message: 'Must be HTML' })
  public readonly html?: string;
}
