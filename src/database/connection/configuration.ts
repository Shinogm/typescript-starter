import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  credential: process.env.SELL_POINT_DATABASE_CREDENTIAL,
  host: process.env.SELL_POINT_DATABASE_HOST,
  port: process.env.SELL_POINT_DATABASE_PORT,
  database: process.env.SELL_POINT_DATABASE_NAME,
  isLocal: process.env.NODE_ENV === 'development',
  credentials: {
    user: process.env.SELL_POINT_DATABASE_USER,
    password: process.env.SELL_POINT_DATABASE_PASSWORD,
  },
}));
