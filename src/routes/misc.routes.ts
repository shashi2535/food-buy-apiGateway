import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { Routes } from '../interface';
import { RoutesConstants } from '../constant';
import { MiscController } from '../controller';
import { MiscValidations } from '../validation';

@injectable()
class Route implements Routes {
  public path = RoutesConstants.MISC.DEFAULT;
  public router = Router();
  private routes = RoutesConstants.MISC;

  constructor(
    private readonly miscValidations: MiscValidations,
    private readonly miscController: MiscController
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // get enity by type
    this.router.post(
      this.routes.GET_ENTITY_TYPE,
      this.miscValidations.getEntityByType,
      this.miscController.getEntityByType
    );
  }
}

export const MiscRoutes = container.resolve(Route);
