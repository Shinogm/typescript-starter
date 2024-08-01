import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../guard/constants';

@Injectable()
export class CookieGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['access_token'];

    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }

    console.log('Access token found', accessToken);

    try {
      const decodedToken = jwt.verify(
        accessToken,
        jwtConstants.secret,
      ) as jwt.JwtPayload;
      if (decodedToken.exp) {
        const expiryDate = new Date(decodedToken.exp * 1000); // El tiempo de expiración en JWT está en segundos, se convierte a milisegundos
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
