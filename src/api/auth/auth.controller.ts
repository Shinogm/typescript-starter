import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './guard/auth.public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.signIn(email, password, res);
    res.send(result);
  }
}
