import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database.module'; // Import DatabaseModule here
import { UserConnection } from './connection/user.connection';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forRootAsync({
      imports: [DatabaseModule],
      useClass: UserConnection,
      inject: [UserConnection],
    }),
  ],
  providers: [UserConnection],
  exports: [MongooseModule, UserConnection],
})
export class DatabaseProviderModule {}
