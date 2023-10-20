import { RequestHandler } from 'express';
import { injectable } from 'tsyringe';
import { ORDER_METHODS } from './../constant';
import { logger } from '../config';
import { UserGrpcService, RestaurantGrpcService } from '../services';
import { UserFactory } from '../factory';
import { ApiHandler, CommonHelper } from '../helper';
import { setErrorResponse, setInitialResponse, setSuccessResponse } from '../utils';
import { IResponse } from '../interface';

@injectable()
export class HealthController {
  constructor(
    private userService: UserGrpcService,
    private restaurantService: RestaurantGrpcService,
    private userFactory: UserFactory,
    private apiService: ApiHandler,
    private commonHelper: CommonHelper
  ) {}

  public checkHealth: RequestHandler = async (_req, res) => {
    let response: IResponse = setInitialResponse();
    try {
      logger.info('***** checking health of services *****');
      const result = await Promise.all([
        this.userService.checkHealth(),
        this.restaurantService.checkHealth(),
        this.apiService.query(this.userFactory.checkHealth, ORDER_METHODS.CHECK_HEALTH),
      ]);
      response = setSuccessResponse(this.commonHelper.prepareHealthResponse(result));
    } catch (err: unknown) {
      logger.error('HealthController :: checkHealth', err);
      response = setErrorResponse((err as Error).message);
    }
    return res.json(response);
  };
}
