import { injectable } from 'tsyringe';
import { RequestHandler } from 'express';
import { RabbitMqService, userService } from '../services';
import { logger } from '../config/logger';

@injectable()
export class AuthController {
  constructor(private readonly rabbitMqService: RabbitMqService) {}

  public registerUser: RequestHandler = async (req, res, next) => {
    try {
      const data = await userService.registerUser(req.body);
      return res.json({
        status:data.status,
        message:data.message
      });
    } catch (err: unknown) {
      logger.error('AuthController:: registerUser', err);
      next(err);
    }
  };
}
