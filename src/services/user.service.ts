import { injectable } from 'tsyringe';
import { SERVICES } from '../constant';
import { GrpcInitiate } from '../helper';
import { GRPC_PORTS, PACKAGE_NAMES, USER_METHODS } from '../constant';

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

  registerUser = (request: any): Promise<any> => {
    return this.grpc.handleClientMethod(request, USER_METHODS.REGISTER_USER);
  };
}

export const userService = new UserGrpcService();
