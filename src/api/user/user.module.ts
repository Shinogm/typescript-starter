import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserSchemaDB, UserSchema } from 'src/database/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaDB.name, schema: UserSchema },
    ]),
  ],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
