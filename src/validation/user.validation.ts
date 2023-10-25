import { BaseValidation } from './base.validation';
import { injectable}from 'tsyringe';
import Joi from 'joi';
@injectable()
export class AuthValidations extends BaseValidation {
  public signUp = this.validateRequest(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    })
  );
  public verifyOtp = this.validateRequest(
    Joi.object({
      otp: Joi.string().length(6).required(),
    })
  );
  public loginOwner = this.validateRequest(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    })
  );
}
