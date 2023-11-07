import { injectable } from 'tsyringe';
import { GrpcInitiate } from '../helper';
import { GRPC_PORTS, PACKAGE_NAMES, USER_METHODS, SERVICES } from '../constant';

@injectable()
export class UserGrpcService {
  private proto_path = 'proto/user.proto';
  private grpc: any;
  constructor() {
    this.grpc = new GrpcInitiate(this.proto_path, PACKAGE_NAMES.USER, SERVICES.USER_SERVICE, GRPC_PORTS.USER_SERVICE);
  }
  checkHealth(request = {}) {
    return this.grpc.handleClientMethod(request, USER_METHODS.CHECK_HEALTH);
  }

  registerSeller = (request: any): Promise<any> => {
    return this.grpc.handleClientMethod(request, USER_METHODS.REGISTER_USER);
  };
  verifyOtp = (request: any): Promise<any> => {
    return this.grpc.handleClientMethod(request, USER_METHODS.VERIFY_OTP);
  };
  resendOtp = (request: any): Promise<any> => {
    return this.grpc.handleClientMethod(request, USER_METHODS.RESEND_OTP);
  };
  loginOwner = (request: any): Promise<any> => {
    return this.grpc.handleClientMethod(request, USER_METHODS.LOGIN_OWNER);
  };

  /**
   * @description This function the user token returning user details
   * @param request {token: string}
   * @returns userDetails
   */
  verifyToken = (request: { token: string }) => {
    return this.grpc.handleClientMethod(request, USER_METHODS.VERIFY_TOKEN);
  };
}

export const userService = new UserGrpcService();
