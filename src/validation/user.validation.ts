import { BaseValidation } from './base.validation';
import { injectable}from 'tsyringe';
import Joi from 'joi';
@injectable()
export class AuthValidations extends BaseValidation {
  public signUp = this.validateRequest(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      id: Joi.number()
    })
  );
  public verifyOtp = this.validateRequest(
    Joi.object({
      otp: Joi.string().length(6).required(),
      email: Joi.string().email(),
      phone: Joi.string().regex(/^[6-9][0-9]{9}$/),
    })
  );
  public loginOwner = this.validateRequest(
    Joi.object({
      phone: Joi.string().regex(/^[6-9][0-9]{9}$/),
      email: Joi.string().email(),
    })
  );
  public resendTokenOnEmail = this.validateRequest(
    Joi.object({
      email: Joi.string().email(),
      phone:Joi.string().regex(/^[6-9][0-9]{9}$/),
    })
  );
}
