import { BaseValidation } from './base.validation';
import { injectable } from 'tsyringe';
import Joi from 'joi';
@injectable()
export class AuthValidations extends BaseValidation {
  public signUp = this.validateRequest(
    Joi.object({
      name: Joi.string().required(),
      email: this.email.required(),
      id: Joi.number(),
    })
  );

  public verifyOtp = this.validateRequest(
    this.commonAuthSchema.keys({
      otp: Joi.string().length(6).required(),
    })
  );

  public loginOwner = this.validateRequest(this.commonAuthSchema);

  public resendTokenOnEmail = this.validateRequest(this.commonAuthSchema);
}
