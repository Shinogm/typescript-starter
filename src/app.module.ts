import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { DatabaseModule } from './database/connection/database.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
