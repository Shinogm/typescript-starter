import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/api/auth/auth.module';
import { CookieGuard } from 'src/api/auth/cookies/middleware/m.cookies.service';
import { UserModule } from 'src/api/user/user.module';
import { DatabaseProviderModule } from 'src/database/provider.module';
import { LoggerModule } from 'src/pino/pino.module';

const modules = [
  DatabaseProviderModule,
  UserModule,
  AuthModule,
  ConfigModule,
  LoggerModule,
];

@Global()
@Module({
  imports: modules,
  providers: [CookieGuard],
  exports: modules,
})
export class GlobalConfigModule {}
