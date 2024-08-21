// src/common/swagger/decorators/custom/api-custom-auth.decorator.ts

import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';

export function ApiCustomAuth() {
  return applyDecorators(
    ApiBearerAuth('custom'),
    ApiProperty({
      description: 'Custom Authentication Header',
      example: 'CustomAuthToken',
    }),
  );
}
