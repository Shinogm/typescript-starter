import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export class CreateUserDto {
  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '123-456-7890',
  })
  phone?: string;

  @Expose()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @Expose()
  @IsEnum(UserRole)
  @ApiProperty({
    description: 'The role of the user (admin, user, guest)',
    example: 'user',
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER; // Valor por defecto

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;
}
