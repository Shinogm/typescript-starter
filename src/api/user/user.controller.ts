import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SwaggerMethod } from 'src/swagger/decorators.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/guard/auth.public';
import { ValidateBody } from 'src/common/decorators/validate-body.decorator';
import { Controller, HttpStatus } from '@nestjs/common';

@ApiTags('Users')
@Public()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @SwaggerMethod({
    method: 'POST',
    route: '/create/v1',
    public: true,
    httpCode: HttpStatus.OK,
    operationSummary: 'Create a new user',
    consumes: 'application/x-www-form-urlencoded',
    body: CreateUserDto,
  })
  async create(@ValidateBody(CreateUserDto) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @SwaggerMethod({
    method: 'GET',
    route: '/all/v1',
    cookieGuard: true,
    httpCode: HttpStatus.OK,
    operationSummary: 'Get all users',
  })
  async findAll() {
    return await this.userService.findAll();
  }
}
