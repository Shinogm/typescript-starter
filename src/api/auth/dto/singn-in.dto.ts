import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly password: string;
}
