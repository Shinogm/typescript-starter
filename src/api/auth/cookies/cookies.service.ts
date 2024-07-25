import { Injectable } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class CookiesService {
  constructor() {}

  setCookie(
    response: FastifyReply,
    name: string,
    value: string,
    options?: {
      path?: string;
      httpOnly?: boolean;
      secure?: boolean;
      maxAge?: number;
    },
  ) {
    response.setCookie(name, value, {
      path: options?.path ?? '/',
      httpOnly: options?.httpOnly ?? true,
      secure: options?.secure ?? process.env.NODE_ENV === 'production',
      maxAge: options?.maxAge,
    });
  }

  getCookie(request: FastifyRequest, name: string): string | undefined {
    return request.cookies[name];
  }

  removeCookie(response: FastifyReply, name: string) {
    response.clearCookie(name, {
      path: '/',
    });
  }

  allCookies(request: FastifyRequest) {
    return request.cookies;
  }
}
