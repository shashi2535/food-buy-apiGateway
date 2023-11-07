import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { configs, logger } from './config';
import { HealthController } from './controller';
import cors from 'cors';
import { RoutesConstants } from './constant';
import { Routes } from './interface';
import { AuthRoute, RestaurantRoutes, MiscRoutes } from './routes';
import * as swaggerDocument from './docs/swagger.json';
import { errorMiddleware } from './middleware';

@injectable()
export class Application {
  public app: express.Application;
  private port: number;
  private env: string;

  constructor(private healthController: HealthController) {
    this.app = express();
    this.port = configs.PORT;
    this.env = configs.NODE_ENV;
  }
  public async init() {
    try {
      this.initializeHealthRoute();
      this.initializeMiddlewares();
      this.initializeRoutes();
      this.initializeErrorHandling();
      this.listen();
      return this.app;
    } catch (error) {
      logger.error(`Error occurred in initializing app: ${(error as Error)?.message}`);
      process.exit(1);
    }
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: configs.CORS.ORIGIN,
        credentials: configs.CORS.CREDENTIALS,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(RoutesConstants.SWAGGER, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private initializeHealthRoute() {
    this.app.get(RoutesConstants.HEALTH, this.healthController.checkHealth);
  }

  private initializeRoutes(): void {
    const routes: Routes[] = [AuthRoute, RestaurantRoutes, MiscRoutes];
    routes?.forEach((route) => this.app.use(route?.path, route.router));
  }

  private initializeErrorHandling(): void {
    this.app.all(RoutesConstants.NOT_FOUND, (req: Request, res: Response) => {
      return res.json({ message: `Can't find ${req?.url} on this server!` });
    });
    this.app.use(errorMiddleware);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port} ENV: ${this.env} mode...`);
    });
  }
}

export const ApplicationInstance = container.resolve(Application);
