import {
  Body,
  Controller,
  Get,
  HttpCode,
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('/all')
  findAll() {
    return this.userService.findAll();
  }
}
