import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { FastifyReply } from 'fastify';
import { CookiesService } from './cookies/cookies.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private cookiesService: CookiesService,
  ) {}

  async signIn(email: string, pass: string, res: FastifyReply) {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, name: user.name, email: user.email };
    if (!payload) {
      throw new UnauthorizedException();
    }

    const access_token = await this.jwtService.signAsync(payload);

    // Usar el CookiesService para establecer la cookie
    this.cookiesService.setCookie(res, 'access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      message: 'Login successful',
    };
  }
}
