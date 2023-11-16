import { NextFunction, Response, Request } from 'express';
import Joi from 'joi';
import { COUNTRY } from '../constant';
export class BaseValidation {
  protected validateRequest(schema: Joi.ObjectSchema, value: 'body' | 'query' | 'params' = 'body') {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req[value]);
      if (error) {
        return res.json({
          // eslint-disable-next-line no-useless-escape
          message: error?.details[0]?.message?.replace(new RegExp(/\"/, 'g'), ''),
          statusCode: false,
        });
      }
      next();
    };
  }

  protected email = Joi.string().email();
  protected phone = Joi.string()
    .regex(/^[6-9]\d{9}$/)
    .message('Enter Valid phone number');

  protected commonAuthSchema = Joi.object({
    email: this.email,
    phone: this.phone,
  });

  protected address = Joi.object({
    address: Joi.string(),
    latitude: Joi.number(),
    longitude: Joi.number(),
    country: Joi.string().optional()['default'](COUNTRY.INDIA),
    pinCode: Joi.any(),
    district: Joi.string(),
    state: Joi.string(),
    exactLocation: Joi.boolean().optional().default(false),
  });
}
