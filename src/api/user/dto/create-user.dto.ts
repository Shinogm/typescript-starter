import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export class CreateUserDto {
  @Expose()
  @MinLength(1, {
    message: 'Name,Name must be at least 1 characters long',
  })
  @MaxLength(50, {
    message: 'Name,Name must be at most 50 characters long',
  })
  @IsString({
    message: 'Name,Name must be a string',
  })
  @ApiProperty({
    description: 'The name of the user',
    required: true,
    example: 'John Doe',
  })
  name: string;

  @Expose()
  @MinLength(1, {
    message: 'Last name,Last name must be at least 1 characters long',
  })
  @MaxLength(50, {
    message: 'Last name,Last name must be at most 50 characters long',
  })
  @IsString({
    message: 'Last name,Last name must be a string',
  })
  @ApiProperty({
    description: 'The last name of the user',
    required: true,
    example: 'Doe',
  })
  lastName: string;

  @Expose()
  @IsEmail({}, { message: 'Email,Email is not valid' })
  @MinLength(1, {
    message: 'Email,Email must be at least 1 characters long',
  })
  @MaxLength(50, {
    message: 'Email,Email must be at most 50 characters long',
  })
  @IsString({
    message: 'Email,Email must be a string',
  })
  @ApiProperty({
    description: 'The email of the user',
    required: true,
    example: 'john.doe@example.com',
  })
  email: string;

  @Expose()
  @IsEnum(UserRole, {
    message: 'Role,Role must be a valid enum',
  })
  @ApiProperty({
    description: 'The role of the user (admin, user, guest)',
    required: true,
    example: 'user',
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER; // Valor por defecto

  @Expose()
  @IsString({
    message: 'Password,Password must be a string',
  })
  @MinLength(8, {
    message: 'Password,Password must be at least 8 characters long',
  })
  @MaxLength(100, {
    message: 'Password,Password must be at most 100 characters long',
  })
  @ApiProperty({
    description: 'The password of the user',
    required: true,
    example: 'password123',
  })
  password: string;
}
