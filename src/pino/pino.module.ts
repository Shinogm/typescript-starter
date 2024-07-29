import { Module } from '@nestjs/common';
import { CustomPinoLogger } from './pino.logger'; // Adjust the import path
import { Params } from 'nestjs-pino';

const pinoLoggerParams: Params = {
  // Your PinoLogger parameters here
};

@Module({
  providers: [
    {
      provide: CustomPinoLogger,
      useFactory: () => new CustomPinoLogger(pinoLoggerParams),
    },
  ],
  exports: [CustomPinoLogger],
})
export class LoggerModule {}
