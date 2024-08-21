import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { MetamaskService } from './metamask.service';
import { Public } from '../guard/auth.public';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class MetamaskController {
  constructor(private readonly authService: MetamaskService) {}
  @Public()
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        signature: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        message: 'Login successful',
        address: '0x1234...',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid signature',
  })
  async login(@Body() loginDto: { address: string; signature: string }) {
    const signature = 'Please sign this message to log in';
    const address = loginDto.address;

    if (!signature) {
      throw new HttpException('Signature is required', 400);
    }

    return this.authService.verifySignature(address, signature);
  }
}
