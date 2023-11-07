import { IResponse } from './../interface';
import { injectable } from 'tsyringe';
import { SERVICES, GRPC_PORTS, PACKAGE_NAMES, MISC_METHODS } from '../constant';
import { GrpcInitiate } from '../helper';

@injectable()
export class MiscGrpcService {
  private proto_path = 'proto/misc.proto';
  private grpc: any;
  constructor() {
    this.grpc = new GrpcInitiate(
      this.proto_path,
      PACKAGE_NAMES.MISC,
      SERVICES.MISC_SERVICE,
      GRPC_PORTS.RESTAURANT_SERVICE
    );
  }

  getEntityByType(request: { type?: string }): Promise<IResponse> {
    return this.grpc.handleClientMethod(request, MISC_METHODS.GET_ENTITY_TYPE);
  }
}
