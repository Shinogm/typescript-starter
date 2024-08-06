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
import { v4 as uuidv4 } from 'uuid';

export enum Expire {
  TEN_SECONDS = '10s',
  ONE_DAY = '1d',
  ONE_WEEK = '1w',
  ONE_MONTH = '1m',
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private cookiesService: CookiesService,
  ) {}

  async signIn(
    email: string,
    pass: string,
    res: Response,
    expiresIn: Expire = Expire.ONE_DAY,
  ) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user || user.password !== pass) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Genera un nuevo identificador de sesión
      const sessionId = uuidv4();
      const payload = {
        sub: user._id,
        name: user.name,
        email: user.email,
        sessionId: sessionId, // Añade el identificador de sesión
      };

      const access_token = await this.jwtService.signAsync(payload, {
        expiresIn: expiresIn,
      });

      const cookieValue = `${access_token}&sessionId=${sessionId}`;

      this.cookiesService.setCookie(res, 'access_token', cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expire: expiresIn,
        path: '/',
      });
      return {
        statusCode: 200,
        message: `The user ${user.name} has been logged in`,
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
