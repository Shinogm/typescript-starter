import { IsString, IsOptional, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { UserInterface } from 'src/api/user/interface/user.interface';

export class CreateUserDto implements UserInterface {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsOptional()
  @IsString()
  phone?: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;
}
