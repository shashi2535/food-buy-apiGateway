import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  return res.json({
    status: false,
    message: err?.message ?? 'Something went wrong !!',
    data: null,
  });
};


export const assignRole =(allowedRoles:string)=> {
  return (req:any, res:any, next:any) => {
    req.body.role = allowedRoles;
    next();
  };
};