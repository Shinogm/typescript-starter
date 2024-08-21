// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './guard/constants';
import { CookiesService } from './cookies/cookies.service';
import { MetamaskService } from './metamask/metamask.service';
import { MetamaskModule } from './metamask/metamask.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    MetamaskModule,
  ],
  providers: [AuthService, CookiesService, MetamaskService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
