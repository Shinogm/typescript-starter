import { Expose } from 'class-transformer';
import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @Expose()
  @IsOptional()
  @IsString({
    message: 'Name,Name must be a string',
  })
  @MinLength(1, {
    message: 'Name,Name must be at least 1 characters long',
  })
  @MaxLength(50, {
    message: 'Name,Name must be at most 50 characters long',
  })
  readonly name?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  readonly age?: number;

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly lastName?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly phone?: string;

  @Expose()
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
