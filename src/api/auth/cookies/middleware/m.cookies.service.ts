import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../guard/constants';
import { AuthService } from '../../auth.service';

@Injectable()
export class CookieGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['access_token'];
    const MILISECONDS = 1000;

    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }
    const [accessTokenSplit, sessionId] = accessToken.split('&');
    console.log('Access token found', accessTokenSplit);
    console.log('Session ID found', sessionId);

    try {
      const decodedToken = jwt.verify(
        accessTokenSplit,
        jwtConstants.secret,
      ) as jwt.JwtPayload;
      if (decodedToken.exp) {
        const expiryDate = new Date(decodedToken.exp * MILISECONDS);
        if (new Date() > expiryDate) {
          throw new UnauthorizedException('Access token has expired');
        }
      } else {
        throw new UnauthorizedException('Token expiration not found');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }
}
