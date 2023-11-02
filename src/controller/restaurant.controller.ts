import { RestaurantGrpcService } from './../services/restaurant.service';
import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { setInitialResponse } from '../utils';
import { IRestaurant } from '../interface';
import { COUNTRY, COUNTRY_CODES } from '../constant';

@injectable()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantGrpcService) {}
  createRestaurant = async (req: Request<IRestaurant>, res: Response) => {
    let response = setInitialResponse();
    try {
      const { user, body } = req;

      if (!body.phoneNumberCountryCode) body.phoneNumberCountryCode = COUNTRY_CODES.INDIA;
      if (!body.country) body.country = COUNTRY.INDIA;
      body.exactLocation = !!body.exactLocation;
      body.whatsAppNotifications = !!body.whatsAppNotifications;

      // Making grpc call to save restaurant information
      response = await this.restaurantService.createRestaurant({ ...req.body, ownerId: user.id });
    } catch (err) {
      response.message = (err as Error).message;
    }
    return res.json(response);
  };
}
