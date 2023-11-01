import { ERROR_MESSAGES } from './../constant';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import { logger } from '../config';
import { userService } from '../services';
import { setInitialResponse } from '../utils';

export const checkJwt: RequestHandler = async (req, res, next) => {
  const response = setInitialResponse();
  try {
    const [, token] = req.header('Authorization')?.split(' ') ?? [];

    if (!token) throw new Error(ERROR_MESSAGES.TOKEN_NF);
    const userDetails = await userService.verifyToken({ token });

    if (!userDetails?.status) throw new Error();

    req.user = userDetails?.data;

    return next();
  } catch (err: unknown) {
    logger.error((err as Error)?.message);
    response.message = ERROR_MESSAGES.UNAUTHORIZED;
    return res.json(response);
  }
};
