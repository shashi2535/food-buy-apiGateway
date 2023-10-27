import { RequestHandler } from 'express';
import { injectable } from 'tsyringe';
// import { ORDER_METHODS } from './../constant';
import { logger } from '../config';
import { RestaurantGrpcService, UserGrpcService } from '../services';
import { UserFactory } from '../factory';
import { ApiHandler } from '../helper';
import { setErrorResponse, setSuccessResponse } from '../utils';
import { IResponse } from '../interface';
import { ORDER_METHODS } from '../constant';

@injectable()
export class HealthController {
  constructor(
    private userService: UserGrpcService,
    private restaurantService: RestaurantGrpcService,
    private userFactory: UserFactory,
    private apiService: ApiHandler
  ) {}

  private reposResponse: Record<string, boolean> = {};

  private async checkOtherReposResponse(index = 0) {
    this.reposResponse['ApiGateway'] = true;
    const repos: any = {
      UserService: this.userService.checkHealth,
      RestaurantService: this.restaurantService.checkHealth,
      OrderService: () => this.apiService.query(this.userFactory?.checkHealth, ORDER_METHODS.CHECK_HEALTH),
    };
    const reposList = Object.keys(repos);
    if (reposList[index]) {
      logger.info(`***** checking health of ${reposList[index]} *****`);
      try {
        await repos[reposList[index]]();
        this.reposResponse[reposList[index]] = true;
      } catch (_e) {
        this.reposResponse[reposList[index]] = false;
      }
      this.checkOtherReposResponse(index + 1);
    } else {
      return this.reposResponse;
    }
  }

  public checkHealth: RequestHandler = async (_req, res) => {
    let response: IResponse = {};
    try {
      logger.info('***** checking health of ApiGateway *****');
      await this.checkOtherReposResponse();
      response = setSuccessResponse(this.reposResponse);
    } catch (err: unknown) {
      // logger.error('HealthController :: checkHealth', err);
      response = setErrorResponse((err as Error).message);
    }
    return res.json(response);
  };
}
