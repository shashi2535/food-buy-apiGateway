import { SUCCESS_MESSAGES } from './../constant/messages.constants';
import { TransformableInfo } from 'logform';
import { IResponse } from '../interface';

export const getEnv = (key: string) => {
  const envValue = process.env[key];
  if (!envValue) {
    throw new Error(`${key} is not defined in env`);
  }
  return envValue;
};

export function getLogMessage(info: TransformableInfo) {
  return `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : ' ');
}

export function setSuccessResponse(data: unknown = null, message = SUCCESS_MESSAGES.DEFAULT) {
  return {
    status: true,
    message,
    data,
  };
}

export function setErrorResponse(message = 'Error', data = null): IResponse {
  return {
    status: false,
    message,
    data,
  };
}

export function setInitialResponse(): IResponse {
  return {
    status: false,
    message: '',
    data: null,
  };
}
