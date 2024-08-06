import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Expire } from '../auth.service';

@Injectable()
export class CookiesService {
  constructor() {}
  private expireToMilliseconds(expire: Expire): number {
    switch (expire) {
      case Expire.TEN_SECONDS:
        return 10000;
      case Expire.ONE_DAY:
        return 86400000;
      case Expire.ONE_WEEK:
        return 604800000;
      case Expire.ONE_MONTH:
        // Aproximadamente 30 días
        return 2592000000;
      default:
        return 0;
    }
  }

  setCookie(
    response: Response,
    name: string,
    value: string,
    options?: {
      path?: string;
      httpOnly?: boolean;
      secure?: boolean;
      expire?: Expire;
    },
  ) {
    response.cookie(name, value, {
      path: options?.path ?? '/',
      httpOnly: options?.httpOnly ?? true,
      secure: options?.secure ?? process.env.NODE_ENV === 'production',
      maxAge: options?.expire
        ? this.expireToMilliseconds(options.expire)
        : undefined,
    });
  }

  refreshCookie(
    response: Response,
    name: string,
    value: string,
    options?: {
      path?: string;
      httpOnly?: boolean;
      secure?: boolean;
      expire?: Expire;
    },
  ) {
    this.setCookie(response, name, value, options);
  }

  getCookie(request: Request, name: string): string | undefined {
    return request.cookies[name];
  }

  removeCookie(response: Response, name: string) {
    response.clearCookie(name, {
      path: '/',
    });
  }

  allCookies(request: Request) {
    return request.cookies;
  }
}
