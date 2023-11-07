import { RestaurantController } from './../controller/restaurant.controller';
import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { Routes } from '../interface';
import { RoutesConstants } from '../constant';
import { checkJwt } from '../middleware';
import { RestaurantValidation } from '../validation';

@injectable()
class Route implements Routes {
  public path = '/';
  public router = Router();
  private routes = RoutesConstants.RESTAURANT;

  constructor(
    private readonly restaurantValidations: RestaurantValidation,
    private readonly restaurantController: RestaurantController
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Save Basic Details
    this.router.post(
      this.routes.SAVE_BASIC_DETAILS,
      checkJwt,
      this.restaurantValidations.saveBasicDetails,
      this.restaurantController.createRestaurant
    );

    // Update Basic Details of a restaurant
    this.router.post(
      this.routes.UPDATE_BASIC_DETAILS,
      checkJwt,
      this.restaurantValidations.updateBasicDetails,
      this.restaurantController.updateRestaurantDetails
    );

    // Get Basic Details of a restaurant
    this.router.get(this.routes.GET_BASIC_DETAILS, checkJwt, this.restaurantController.getRestaurantBasicDetails);

    // Saving restaurant timings and types
    this.router.post(
      this.routes.SAVE_RESTAURANT_DETAILS,
      checkJwt,
      this.restaurantValidations.saveRestaurantDetails,
      this.restaurantController.saveRestaurantDetails
    );

    // Get Restaurant Details
    this.router.get(this.routes.GET_RESTAURANT_DETAILS, checkJwt, this.restaurantController.getRestaurantDetails);

    // Update Restaurant Details
    this.router.put(
      this.routes.UPDATE_RESTAURANT_DETAILS,
      checkJwt,
      this.restaurantValidations.saveRestaurantDetails,
      this.restaurantController.updateRestaurantDetails
    );
  }
}

export const RestaurantRoutes = container.resolve(Route);
