import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoConfigService } from '../mongo.config.service';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MongooseError } from 'mongoose';

@Injectable()
export class UserConnection implements MongooseOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly mongoConfigService: MongoConfigService,
  ) {}

  async createMongooseOptions(): Promise<MongooseModuleOptions> {
    try {
      const { user, password: pass } =
        await this.mongoConfigService.CREDENTIALS();
      const url = await this.mongoConfigService.MONGO_URL();
      const isLocal = await this.mongoConfigService.IS_LOCAL();

      return {
        uri: url,
        user: !isLocal ? user : null,
        pass: !isLocal ? pass : null,
        tlsCAFile: !isLocal
          ? `${process.cwd()}/dist/rds-combined-ca-bundle.pem`
          : null,
        tls: !isLocal ? true : null,
        tlsAllowInvalidCertificates: !isLocal ? true : null,
        tlsAllowInvalidHostnames: !isLocal ? true : null,
        retryAttempts: 0,
        retryWrites: false,
        replicaSet: 'rs0',
        readPreference: 'nearest',
        directConnection: true,
        authSource: 'admin',
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        retryDelay: 5000,
        maxIdleTimeMS: 2,
        connectionErrorFactory: (error: MongooseError) => {
          console.log(error);
          return error;
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
