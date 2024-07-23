import { Module } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { DatabaseModule } from './database/connection/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
