import { Injectable } from '@nestjs/common';
import { CustomPinoLogger } from 'src/pino/pino.logger';
import { UserService } from '../user.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly logger: CustomPinoLogger,
    private readonly usersService: UserService,
  ) {}

  validateSession(userId: string, sessionId?: string): boolean {
    try {
      const user = this.usersService.findOne(userId);
      if (!user || !sessionId) {
        throw new Error('User not found');
      }
      return true;
    } catch (error) {
      this.logger.error(`Error validating session: ${error.message}`);
      throw new Error('Error validating session');
    }
  }
}
