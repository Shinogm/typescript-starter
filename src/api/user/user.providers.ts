// user.providers.ts
import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CookiesService } from '../auth/cookies/cookies.service';
import { AuthService } from '../auth/auth.service';

export const userProviders: Provider[] = [
  UserService,
  JwtService,
  CookiesService,
  AuthService,
];
