import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './connection/configuration';
import { MongoConfigService } from './mongo.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [MongoConfigService],
  exports: [MongoConfigService], // No need to export ConfigService here
})
export class DatabaseModule {}
