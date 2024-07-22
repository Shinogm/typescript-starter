import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsHash,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly lastName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  readonly phone?: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsHash('sha256')
  readonly password: string;
}
