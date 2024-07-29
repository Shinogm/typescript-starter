import { Injectable, LoggerService } from '@nestjs/common';
import { PinoLogger as BasePinoLogger, Params } from 'nestjs-pino';

@Injectable()
export class CustomPinoLogger implements LoggerService {
  private readonly pinoLogger: BasePinoLogger;

  constructor(params: Params) {
    this.pinoLogger = new BasePinoLogger(params);
  }

  log(message: any, context?: string) {
    this.pinoLogger.info({ context }, message);
  }

  error(message: any, trace?: string, context?: string) {
    this.pinoLogger.error({ context, trace }, message);
  }

  warn(message: any, context?: string) {
    this.pinoLogger.warn({ context }, message);
  }

  debug(message: any, context?: string) {
    this.pinoLogger.debug({ context }, message);
  }

  verbose(message: any, context?: string) {
    this.pinoLogger.trace({ context }, message);
  }

  fatal(message: any, trace?: string, context?: string) {
    this.pinoLogger.fatal({ context, trace }, message);
  }
}
