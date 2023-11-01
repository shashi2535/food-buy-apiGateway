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
    const response = setInitialResponse();
    try {
      const { user, body } = req;

      if (!body.phoneNumberCountryCode) body.phoneNumberCountryCode = COUNTRY_CODES.INDIA;
      if (!body.country) body.country = COUNTRY.INDIA;
      body.exactLocation = !!body.exactLocation;
      
      const restaurant = await this.restaurantService.createRestaurant({ ...req.body, ownerId: user.id });
      console.log(req.body, restaurant);
    } catch (err) {
      response.message = (err as Error).message;
    }
    return res.json(response);
  };
}
