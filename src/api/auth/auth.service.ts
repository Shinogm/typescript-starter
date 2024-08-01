import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { CookiesService } from './cookies/cookies.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private cookiesService: CookiesService,
  ) {}

  async signIn(email: string, pass: string, res: Response) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user || user.password !== pass) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user._id, name: user.name, email: user.email };
      const access_token = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });

      this.cookiesService.setCookie(res, 'access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return {
        message: 'Login successful',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(`User with email ${email} not found`);
        throw new UnauthorizedException('Invalid credentials');
      }
      this.logger.error(`Error during sign-in: ${error.message}`);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async signOut(res: Response) {
    try {
      this.cookiesService.removeCookie(res, 'access_token');
      return {
        message: 'Sign out successful',
      };
    } catch (error) {
      this.logger.error(`Error during sign-out: ${error.message}`);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
