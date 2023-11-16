import { injectable } from 'tsyringe';
import Joi from 'joi';
import { COUNTRY_CODES, WEEK_DAYS } from '../constant';
import { BaseValidation } from './base.validation';

@injectable()
export class RestaurantValidation extends BaseValidation {
  // Basic Details schema for saving restaurant
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

  private timings = Joi.array()
    .items(
      Joi.object({
        day: Joi.string().valid(...Object.values(WEEK_DAYS)),
        shifts: Joi.array()
          .items(
            Joi.object({
              openingTime: Joi.string().required(),
              closingTime: Joi.string().required(),
            })
          )
          .max(3)
          .min(1),
      })
    )
    .unique((a, b) => a.day === b.day);

  public saveBasicDetails = this.validateRequest(this.basicDetails.options({ presence: 'required' }).required());

  public updateBasicDetails = this.validateRequest(this.basicDetails);

  // Save Details of Restaurant
  public saveRestaurantDetails = this.validateRequest(
    Joi.object({
      kitchenType: Joi.array().items(Joi.number().required()),
      outlets: Joi.array().items(Joi.number().required()),
      cuisines: Joi.array().items(Joi.number().required()),
      timings: this.timings,
    })
  );
}
