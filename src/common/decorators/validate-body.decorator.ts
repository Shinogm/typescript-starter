import { ClassConstructor } from '@nestjs/class-transformer';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { validate } from 'class-validator';
import { Request } from 'express';

import { IParameter } from '../http/exceptions/interfaces/exception.interface';
import { GenericValidationException } from '../http/exceptions/responses.exception';
import { plainToInstance } from 'class-transformer';

export const ValidateBody = createParamDecorator(
  async <T extends object>(
    classType: ClassConstructor<T>,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const body = request.body;
    console.log('Body', body);
    console.log('ClassType', classType);

    const dto = plainToInstance(classType, body, {
      excludeExtraneousValues: true,
    });
    console.log('Dto', dto);
    const errors = await validate(dto, { stopAtFirstError: true });

    if (errors.length > 0) {
      const { constraints, children } = errors[0];

      const parameters = constraints
        ? getParametersFromConstraints(constraints)
        : children && children.length > 0
          ? getParametersFromConstraints(children[0].children[0].constraints)
          : [{ key: 'ValidationError', message: 'Unknown validation error' }];

      throw new GenericValidationException(parameters);
    }

    return dto;
  },
);

function getParametersFromConstraints(
  constraints: Record<string, string>,
): IParameter[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.entries(constraints).map(([_, value]) => {
    const [key, message] = value.split(',');
    return { key, message };
  });
}
