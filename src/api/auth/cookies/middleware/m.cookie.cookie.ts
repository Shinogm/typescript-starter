import { applyDecorators, UseGuards } from '@nestjs/common';
import { CookieGuard } from './m.cookies.service';

export function UseCookieGuard() {
  return applyDecorators(UseGuards(CookieGuard));
}
