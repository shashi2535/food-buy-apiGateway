import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { AuthController } from '../controller';
import { AuthValidations } from '../validation';
import { Routes } from '../interface';
import { RoutesConstants } from '../constant';
import { assignRole } from '../middleware';

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
    this.router.post(`${this.path}${RoutesConstants.SELER_AUTH.DEFAULT}/${RoutesConstants.SELER_AUTH.SIGNUP}`, this.authValidation.signUp, assignRole('owner'), this.authController.registerUser);
    this.router.post( `${this.path}${RoutesConstants.SELER_AUTH.DEFAULT}/${RoutesConstants.SELER_AUTH.VERIFY_OTP}`, this.authValidation.verifyOtp, this.authController.verifyOtp);
    this.router.post( `${this.path}${RoutesConstants.SELER_AUTH.DEFAULT}/${RoutesConstants.SELER_AUTH.RESEND_OTP}`,  this.authValidation.resendTokenOnEmail, this.authController.resendTokenOnMail);
    this.router.post(`${this.path}${RoutesConstants.SELER_AUTH.DEFAULT}/${RoutesConstants.SELER_AUTH.LOGIN}`, this.authValidation.loginOwner, this.authController.loginOwner);
  }
}

export const AuthRoute = container.resolve(Route);
