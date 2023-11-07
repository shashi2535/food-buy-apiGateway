/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, RequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  return res.json({
    status: false,
    message: err?.message ?? 'Something went wrong !!',
    data: null,
  });
};

export const assignRoleToRequest = (allowedRoles: string): RequestHandler => {
  return (req, res, next) => {
    req.body.role = allowedRoles;
    next();
  };
};
