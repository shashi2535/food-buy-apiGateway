import Joi from 'joi';
import { COUNTRY, COUNTRY_CODES } from '../constant';
import { BaseValidation } from './base.validation';

export class RestaurantValidation extends BaseValidation {
  private basicDetails = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    latitude: Joi.number(),
    longitude: Joi.number(),
    country: Joi.string().optional()['default'](COUNTRY.INDIA),
    pinCode: Joi.any(),
    district: Joi.string(),
    state: Joi.string(),
    exactLocation: Joi.boolean().optional().default(false),
    whatsAppNotification: Joi.boolean(),
    phoneNumber: this.phone.optional(),
    phoneNumberCountryCode: Joi.string().optional().default(COUNTRY_CODES.INDIA),
    landLine: Joi.string().optional(),
    landLineCode: Joi.string().optional(),
  })
    .or('phoneNumber', 'landLine')
    .unknown(true);

  public saveBasicDetails = this.validateRequest(this.basicDetails.options({ presence: 'required' }).required());

  public editBasicDetails = this.validateRequest(this.basicDetails);
}
