import { join } from 'path';
import { GrpcInitiate } from './grpc/grpc.service';
const serviceName = process.env.USER_SERVICE;
const proto_path = join(__dirname, '../../src/proto/user.proto');
class UserGrpcService {
  private grpc: any;
  constructor() {
    this.grpc = new GrpcInitiate(
      proto_path,
      'UserService',
      serviceName,
      process.env.GRPC_USER_URL as string
    );
  }

  userSignup = (request: any): Promise<any> => {
    return this.grpc.handleClientMethod(request, 'userSignup');
  };
}

export const userService = new UserGrpcService();
