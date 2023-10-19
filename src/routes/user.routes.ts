import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { AuthController } from '../controller';
import { AuthValidations } from '../validation';
import { Routes } from '../interface';
@injectable()
class Route implements Routes {
  public path = '/';
  public router = Router();

  constructor(
    private readonly authController: AuthController,
    private readonly authValidation: AuthValidations
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Sign Up Route
    this.router.post(`${this.path}signup`, this.authValidation.signUp, this.authController.signup);
  }
}

export const AuthRoute = container.resolve(Route);
