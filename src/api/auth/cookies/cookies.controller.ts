import { Controller, Get, Post, Req, Res, Body, Query } from '@nestjs/common';
import { CookiesService } from './cookies.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCookieDto } from './dto/create-cookie.dto';

@Controller('cookies')
export class CookiesController {
  constructor(private readonly cookiesService: CookiesService) {}

  @Post('set')
  setCookie(@Body() setCookieDto: CreateCookieDto, @Res() res: FastifyReply) {
    const { name, value, options } = setCookieDto;
    this.cookiesService.setCookie(res, name, value, options);
    res.send({ message: 'Cookie set successfully' });
  }

  @Get('get')
  getCookie(@Query('name') name: string, @Req() req: FastifyRequest) {
    const value = this.cookiesService.getCookie(req, name);
    return { name, value };
  }

  @Post('remove')
  removeCookie(@Body('name') name: string, @Res() res: FastifyReply) {
    this.cookiesService.removeCookie(res, name);
    res.send({ message: 'Cookie removed successfully' });
  }

  @Get('all')
  getAllCookies(@Req() req: FastifyRequest) {
    const cookies = this.cookiesService.allCookies(req);
    return { cookies };
  }
}
