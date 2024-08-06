import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @Expose()
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
    required: true,
    type: String,
  })
  @IsString({
    message: 'Email,Email must be at least 1 characters long',
  })
  @MinLength(1, { message: 'Email,Email must be at least 1 characters long' })
  @MaxLength(50, { message: 'Email,Email must be at most 50 characters long' })
  @IsEmail({}, { message: 'Email,Email is not valid' })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
    required: true,
    type: String,
  })
  @IsString({
    message: 'Password,Password must be at least 8 characters long',
  })
  @MinLength(1, {
    message: 'Password,Password must be at least 8 characters long',
  })
  @MaxLength(100, {
    message: 'Password,Password must be at most 100 characters long',
  })
  public password: string;
}
