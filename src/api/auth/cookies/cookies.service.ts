import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CookiesService {
  constructor() {}

  setCookie(
    response: Response,
    name: string,
    value: string,
    options?: {
      path?: string;
      httpOnly?: boolean;
      secure?: boolean;
      maxAge?: number;
    },
  ) {
    response.cookie(name, value, {
      path: options?.path ?? '/',
      httpOnly: options?.httpOnly ?? true,
      secure: options?.secure ?? process.env.NODE_ENV === 'production',
      maxAge: options?.maxAge,
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
      maxAge?: number;
    },
  ) {
    response.cookie(name, value, {
      path: options?.path ?? '/',
      httpOnly: options?.httpOnly ?? true,
      secure: options?.secure ?? process.env.NODE_ENV === 'production',
      maxAge: options?.maxAge,
    });
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
