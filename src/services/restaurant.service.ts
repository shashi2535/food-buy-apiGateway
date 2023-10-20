import { injectable } from 'tsyringe';
import { SERVICES } from '../constant';
import { GrpcInitiate } from '../helper';
import { GRPC_PORTS, PACKAGE_NAMES, RESTAURANT_METHODS } from '../constant';

@injectable()
export class RestaurantGrpcService {
  private proto_path = 'proto/restaurant.proto';
  private grpc: any;
  constructor() {
    this.grpc = new GrpcInitiate(
      this.proto_path,
      PACKAGE_NAMES.RESTAURANT,
      SERVICES.RESTAURANT_SERVICE,
      GRPC_PORTS.RESTAURANT_SERVICE
    );
  }

  checkHealth(request = {}) {
    return this.grpc.handleClientMethod(request, RESTAURANT_METHODS.CHECK_HEALTH);
  }
}
