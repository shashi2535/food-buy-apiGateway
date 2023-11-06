import Joi from 'joi';
import { COUNTRY_CODES } from '../constant';
import { BaseValidation } from './base.validation';

export class RestaurantValidation extends BaseValidation {
  private basicDetails = Joi.object({
    name: Joi.string(),
    whatsAppNotifications: Joi.boolean(),
    phoneNumber: this.phone.optional(),
    phoneNumberCountryCode: Joi.string().optional().default(COUNTRY_CODES.INDIA),
    landlineNumber: Joi.string().optional(),
    landLineCode: Joi.string().optional(),
    address: this.address,
  })
    .or('phoneNumber', 'landLine')
    .unknown(true);

  public saveBasicDetails = this.validateRequest(this.basicDetails.options({ presence: 'required' }).required());

  public updateBasicDetails = this.validateRequest(this.basicDetails);
}
