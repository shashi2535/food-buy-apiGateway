import { BaseValidation } from './base.validation';
import { injectable } from 'tsyringe';
import Joi from 'joi';
@injectable()
export class MiscValidations extends BaseValidation {
  public getEntityByType = this.validateRequest(
    Joi.object({
      type: Joi.array().items(Joi.string()),
    })
  );
}
