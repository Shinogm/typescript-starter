import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/guard/auth.public';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.FOUND);
      }
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/all')
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      console.error('Error finding all users:', error);
      throw new Error('Failed to find users');
    }
  }
}
