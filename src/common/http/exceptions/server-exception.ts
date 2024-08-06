import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseAction } from '../responses/action.response';
import { ResponseType } from '../responses/type.response';
import { CodeException } from './interfaces/code.interface';
import { IException, IParameter } from './interfaces/exception.interface';

export class ServerException extends HttpException implements IException {
  /**
   * Error type
   */
  @ApiProperty({ default: ResponseType.ERROR, type: String })
  type: ResponseType = ResponseType.ERROR;

  /**
   * Service action
   */
  @ApiProperty({ default: ResponseAction.CANCEL, type: String })
  action: ResponseAction = ResponseAction.CANCEL;

  /**
   * Error code
   */
  @ApiProperty({ default: CodeException.UNKNOWN_ERROR, type: String })
  code: string;

  /**
   * Error details
   */
  @ApiProperty({ type: String, nullable: true })
  diagnosticInformation: string = null;

  /**
   * Errored parameters
   */
  @ApiProperty({ default: [], nullable: true })
  parameters: IParameter[] = [];

  @ApiProperty({ type: String })
  message: string;

  constructor(
    code: string,
    message: string,
    status: HttpStatus,
    diagnosticInformation?: string,
  ) {
    super(message, status);
    this.code = code;
    this.diagnosticInformation = diagnosticInformation;
  }

  getResponse(): any {
    return {
      statusCode: this.getStatus(),
      message: this.message,
      parameters: this.parameters,
    };
  }
}
