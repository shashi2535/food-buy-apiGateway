import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { AuthController } from '../controller';
import { AuthValidations } from '../validation';
import { Routes } from '../interface';
import { RoutesConstants } from '../constant';

@injectable()
class Route implements Routes {
  public path = RoutesConstants.ROOT;
  public router = Router();

  constructor(
    private readonly authController: AuthController,
    private readonly authValidation: AuthValidations
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Sign Up Route
    this.router.post(`${this.path}register`, this.authValidation.signUp, this.authController.registerUser);
  }
}

export const AuthRoute = container.resolve(Route);
