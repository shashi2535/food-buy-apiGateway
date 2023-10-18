import {NODE_ENV_ENUM} from '../constant';
import {config } from 'dotenv';
import { getEnv } from '../utils';
const NODE_ENV = process.env.NODE_ENV == NODE_ENV_ENUM.Development ? NODE_ENV_ENUM.Development:NODE_ENV_ENUM.Production;
config({
  path: `.env.${NODE_ENV }`
});
export const configs = {
  PORT: +getEnv('PORT'),
  CORS: {
    ORIGIN: '*',
    CREDENTIALS: true,
  },
  NODE_ENV,
  SALT_ROUND: 10,
  JWT: {
    SECRET: getEnv('JWT_SECRET'),
    EXPIRES_IN: getEnv('JWT_EXPIRES_IN'),
  },
};
