import { NODE_ENV } from '../constant';
import { config } from 'dotenv';
import { getEnv } from '../utils';

process.env.NODE_ENV = NODE_ENV.DEVELOPMENT || !process.env.NODE_ENV ? NODE_ENV.DEVELOPMENT : NODE_ENV.PRODUCTION;

config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const configs = {
  PORT: +getEnv('PORT'),
  CORS: {
    ORIGIN: '*',
    CREDENTIALS: true,
  },
  NODE_ENV: process.env.NODE_ENV,
  SALT_ROUND: 10,
  JWT: {
    SECRET: getEnv('JWT_SECRET'),
    EXPIRES_IN: getEnv('JWT_EXPIRES_IN'),
  },
  ORDER_SERVICE_URL: getEnv('ORDER_SERVICE_URL'),
};
