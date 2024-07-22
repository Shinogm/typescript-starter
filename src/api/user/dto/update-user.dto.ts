import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly name?: string;

  @IsOptional()
  @IsInt()
  readonly age?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly phone?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
