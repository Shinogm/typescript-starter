import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { Public } from './guard/auth.public';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() body: { email: string; password: string },
    @Res() res: FastifyReply,
  ) {
    const { email, password } = body;
    const response = await this.authService.signIn(email, password, res);
    res.send(response);
  }
  @Public()
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
