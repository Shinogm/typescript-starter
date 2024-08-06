import { Controller, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SwaggerMethod } from 'src/swagger/decorators.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidateBody } from 'src/common/decorators/validate-body.decorator';
import { SignInDto } from './dto/singn-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SwaggerMethod({
    method: 'POST',
    route: '/login/v1',
    public: true,
    httpCode: HttpStatus.OK,
    consumes: 'application/json',
    operationSummary: 'Login a user',
    body: SignInDto,
  })
  async login(
    @ValidateBody(SignInDto) signInDto: SignInDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
      res,
    );
    res.send(result);
  }
}
