import { IResponse, ISaveBasicDetails } from './../interface';
import { injectable } from 'tsyringe';
import { SERVICES, GRPC_PORTS, PACKAGE_NAMES, RESTAURANT_METHODS } from '../constant';
import { GrpcInitiate } from '../helper';

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

  // Function to create a new restaurant
  createRestaurant(request: ISaveBasicDetails): Promise<IResponse<{ id: number }>> {
    return this.grpc.handleClientMethod(request, RESTAURANT_METHODS.CREATE_RESTAURANT);
  }

  // Function to update a restaurant details
  updateBasicDetails(request: { data: ISaveBasicDetails; id: number }): Promise<IResponse<any>> {
    return this.grpc.handleClientMethod(request, RESTAURANT_METHODS.UPDATE_BASIC_DETAILS);
  }

  // Function to get basic details of a restaurant along with address
  getRestaurantBasicDetails(request: { id?: number; ownerId?: number }) {
    return this.grpc.handleClientMethod(request, RESTAURANT_METHODS.GET_RESTAURANT_BASIC_DETAILS);
  }

  saveRestaurantDetails(request: any) {
    return this.grpc.handleClientMethod(request, RESTAURANT_METHODS.SAVE_RESTAURANT_DETAILS);
  }

  getRestaurantDetails(request: { id?: number; ownerId?: number; timings: boolean }) {
    return this.grpc.handleClientMethod(request, RESTAURANT_METHODS.GET_RESTAURANT_DETAILS);
  }

  updateRestaurantDetails(request: any) {
    return this.grpc.handleClientMethod(request, RESTAURANT_METHODS.UPDATE_RESTAURANT_DETAILS);
  }

  getAllRestaurants(request: { ownerId?: number }) {
    return this.grpc.handleClientMethod(request, RESTAURANT_METHODS.GET_ALL_RESTAURANTS);
  }
}
