import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomPinoLogger } from 'src/pino/pino.logger';

@Injectable()
export class MongoConfigService {
  constructor(
    private readonly logger: CustomPinoLogger,
    private readonly configService: ConfigService,
  ) {
    this.logger.log(MongoConfigService.name);
  }

  public async MONGO_URL(): Promise<string> {
    try {
      const host = this.configService.get<string>('mongo.host');
      const port = this.configService.get<string>('mongo.port');
      const db = this.configService.get<string>('mongo.database');

      return `mongodb://${host}:${port}/${db}`;
    } catch (error) {
      this.logger.error(error);
      throw error; // Ensure to throw the error or handle it appropriately
    }
  }

  public async CREDENTIALS(): Promise<{ user: string; password: string }> {
    try {
      const credentials = this.configService.get<{
        user: string;
        password: string;
      }>('mongo.credentials');

      return credentials;
    } catch (error) {
      this.logger.error(error);
      throw error; // Ensure to throw the error or handle it appropriately
    }
  }

  public async IS_LOCAL(): Promise<boolean> {
    try {
      return this.configService.get<boolean>('mongo.isLocal');
    } catch (error) {
      this.logger.error(error);
      throw error; // Ensure to throw the error or handle it appropriately
    }
  }
}
