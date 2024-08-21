import { Controller, Get, Req, Res } from '@nestjs/common';
import { CookiesService } from './cookies.service';
import { Request, Response } from 'express';

@Controller('cookies')
export class CookiesController {
  constructor(private readonly cookiesService: CookiesService) {}

  @Get('set')
  setCookie(@Res() response: Response) {
    this.cookiesService.setCookie(response, 'test', 'value', {
      httpOnly: true,
    });
    response.send('Cookie set');
  }

  @Get('get')
  getCookie(@Req() request: Request) {
    const cookie = this.cookiesService.getCookie(request, 'test');
    return { cookie };
  }

  @Get('remove')
  removeCookie(@Res() response: Response) {
    this.cookiesService.removeCookie(response, 'test');
    response.send('Cookie removed');
  }

  @Get('all')
  allCookies(@Req() request: Request) {
    const cookies = this.cookiesService.allCookies(request);
    return { cookies };
  }
}
