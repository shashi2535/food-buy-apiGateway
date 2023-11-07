import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { AuthController } from '../controller';
import { AuthValidations } from '../validation';
import { Routes } from '../interface';
import { ROLES, RoutesConstants } from '../constant';
import { assignRoleToRequest } from '../middleware';

@injectable()
class Route implements Routes {
  private route = RoutesConstants.SELLER_AUTH;
  public path = this.route.DEFAULT;
  public router = Router();

  constructor(
    private readonly authController: AuthController,
    private readonly authValidation: AuthValidations
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Sign Up Route
    this.router.post(
      this.route.SIGNUP,
      this.authValidation.signUp,
      assignRoleToRequest(ROLES.OWNER),
      this.authController.registerUser
    );

    // Verify Otp Route
    this.router.post(this.route.VERIFY_OTP, this.authValidation.verifyOtp, this.authController.verifyOtp);

    // Resend Otp Route
    this.router.post(
      this.route.RESEND_OTP,
      this.authValidation.resendTokenOnEmail,
      this.authController.resendTokenOnMail
    );

    // Login Restaurant Owner
    this.router.post(
      this.route.LOGIN,
      this.authValidation.loginOwner,
      assignRoleToRequest(ROLES.OWNER),
      this.authController.loginOwner
    );
  }
}

export const AuthRoute = container.resolve(Route);
