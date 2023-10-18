import { BaseValidation } from "./base.validation";
import { injectable}from "tsyringe"
import Joi from "joi"
@injectable()
export class AuthValidations extends BaseValidation {
  public signUp = this.validateRequest(
    Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    })
  );
}
