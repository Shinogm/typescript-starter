import { HttpException, Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class MetamaskService {
  private web3: Web3;

  constructor() {
    this.web3 = new Web3();
  }

  async verifySignature(address: string, signature: string): Promise<any> {
    try {
      const message = 'Sign this message to log in';
      // Verifica la firma aquí. Asegúrate de que la firma sea válida.
      const recoveredAddress = this.web3.eth.accounts.recover(
        message,
        signature,
      );

      const recoveredAddressLowerCase =
        recoveredAddress.toLowerCase() === address.toLowerCase();
      return new HttpException('Login successful', 200, {
        cause: recoveredAddressLowerCase,
      });
    } catch (error) {
      throw new HttpException('Invalid signature', 400);
    }
  }
}
