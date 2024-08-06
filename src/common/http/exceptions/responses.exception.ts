import { ApiProperty } from '@nestjs/swagger';
import { IParameter } from './interfaces/exception.interface';
import { CodeException } from './interfaces/code.interface';
import { ServerException } from './server-exception';
import { HttpStatus } from '@nestjs/common';
import { MessageException } from './interfaces/message.interface';

export class GenericValidationException extends ServerException {
  @ApiProperty({ default: CodeException.GENERIC_VALIDATION_ERROR })
  code: string;

  @ApiProperty({ default: MessageException.GENERIC_VALIDATION_ERROR })
  message: string;

  constructor(parameters: IParameter[]) {
    super(
      CodeException.GENERIC_VALIDATION_ERROR,
      MessageException.GENERIC_VALIDATION_ERROR,
      HttpStatus.BAD_REQUEST,
    );
    this.parameters = parameters;
  }
}
