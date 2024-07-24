// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/connection/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/guard/auth.guard';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    ...userProviders,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UserController],
  exports: [UserService], // Exportamos UserService
})
export class UserModule {}
