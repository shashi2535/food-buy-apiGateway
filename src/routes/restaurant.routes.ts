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
    // Sign Up Route
    this.router.post(
      this.routes.SAVE_BASIC_DETAILS,
      checkJwt,
      this.restaurantValidations.saveBasicDetails,
      this.restaurantController.createRestaurant
    );
  }
}

export const RestaurantRoutes = container.resolve(Route);
