import 'reflect-metadata';
import express from "express"
import cors from "cors"
import { configs } from "./config/";
import { RoutesConstants } from "./constant";
import {Routes} from "./interface"
import {AuthRoute} from "./routes"
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './docs/swagger.json';
export class Application {
    public app: express.Application;
    private port: number;
    private env: string;
  
    constructor() {
      this.app = express();
      this.port = configs.PORT;
      this.env = configs.NODE_ENV;
    }
    public async init() {
      try {
          this.initializeMiddlewares();
          this.initializeRoutes();
          this.initializeErrorHandling();
          this.listen();
          return this.app;
      } catch (error) {
        // logs.red(
          console.log(`Error occurred in initializing app: ${(error as Error)?.message}`);
        // );
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
      this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
  
    private initializeRoutes(): void {
      const routes: Routes[] = [AuthRoute];
      routes?.forEach((route) => this.app.use(route?.path, route.router));
    }
  
    private initializeErrorHandling(): void {
      this.app.all(RoutesConstants.NOT_FOUND, (req: Request) => {
        throw new Error(`Can't find ${req?.url} on this server!`);
      });
      // this.app.use(errorMiddleware);
    }
  
    private listen(): void {
      this.app.listen(this.port, () => {
         console.log(`🚀 App listening on the port ${this.port} ENV: ${this.env} mode...`)
      });
    }
  }
  
export const ApplicationInstance = new Application();
  