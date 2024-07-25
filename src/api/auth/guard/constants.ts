import * as dotenv from 'dotenv';
export const jwtConstants = {
  secret: dotenv.config().parsed?.JWT_SECRET,
};

export const cookieConstants = {
  secret: dotenv.config().parsed?.COOKIE_SECRET,
};
