import { RestaurantGrpcService } from './../services/restaurant.service';
import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { setInitialResponse } from '../utils';
import { ISaveBasicDetails } from '../interface';
import { COUNTRY, COUNTRY_CODES } from '../constant';

@injectable()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantGrpcService) {}

  // Save Basic Details
  createRestaurant = async (req: Request<ISaveBasicDetails>, res: Response) => {
    let response = setInitialResponse();
    try {
      const { user, body } = req;

      if (!body.phoneNumberCountryCode) body.phoneNumberCountryCode = COUNTRY_CODES.INDIA;
      if (!body.address.country) body.address.country = COUNTRY.INDIA;

      body.address.exactLocation = !!body.address.exactLocation;
      body.whatsAppNotifications = !!body.whatsAppNotifications;
      // Making grpc call to save restaurant information
      response = await this.restaurantService.createRestaurant({ ...req.body, ownerId: user?.id });
    } catch (err) {
      console.log('RestaurantController::createRestaurant', (err as Error).message);
      response.message = (err as Error).message;
    }
    return res.json(response);
  };

  /**
   * @description Updates restaurant details
   * @param req {id in params}
   * @param res
   * @returns
   */
  updateRestaurantBasicDetails = async (req: Request<any>, res: Response) => {
    let response = setInitialResponse();
    try {
      const { user, body } = req;
      const { id } = req.params;
      // Making grpc call to update restaurant information
      response = await this.restaurantService.updateBasicDetails({ data: { ...body, ownerId: user?.id }, id });
    } catch (err) {
      console.log('RestaurantController::updateRestaurantBasicDetails', (err as Error).message);
      response.message = (err as Error).message;
    }
    return res.json(response);
  };

  /**
   * @description Get restaurant basic details
   * @param req
   * @param res
   * @returns
   */
  getRestaurantBasicDetails = async (req: Request<any>, res: Response) => {
    let response = setInitialResponse();
    try {
      const { id } = req.params;
      response = await this.restaurantService.getRestaurantBasicDetails({ ownerId: req?.user?.id, id });
    } catch (err) {
      console.log('RestaurantController::getRestaurantBasicDetails', (err as Error).message);
      response.message = (err as Error).message;
    }
    return res.json(response);
  };

  saveRestaurantDetails = async (req: Request<any>, res: Response) => {
    let response = setInitialResponse();
    try {
      const { id } = req.params;
      response = await this.restaurantService.saveRestaurantDetails({ ownerId: req?.user?.id, id, ...req.body });
    } catch (err) {
      console.log('RestaurantController::saveRestaurantDetails', (err as Error).message);
      response.message = (err as Error).message;
    }
    return res.json(response);
  };

  // Get Restaurant Timings
  getRestaurantDetails = async (req: Request<any>, res: Response) => {
    let response = setInitialResponse();
    try {
      const { id } = req.params;
      const timings = req.query?.timings === 'true';
      response = await this.restaurantService.getRestaurantDetails({ ownerId: req?.user?.id, id, timings });
    } catch (err) {
      console.log('RestaurantController::getRestaurantDetails', (err as Error).message);
      response.message = (err as Error).message;
    }
    return res.json(response);
  };

  // Update Restaurant Timings and types
  updateRestaurantDetails = async (req: Request<any>, res: Response) => {
    let response = setInitialResponse();
    try {
      const { id } = req.params;
      response = await this.restaurantService.updateRestaurantDetails({ ownerId: req?.user?.id, id, ...req.body });
    } catch (err) {
      console.log('RestaurantController::updateRestaurantDetails', (err as Error).message);
      response.message = (err as Error).message;
    }
    return res.json(response);
  };
}
