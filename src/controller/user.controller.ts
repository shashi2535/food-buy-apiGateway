import { injectable } from 'tsyringe';
import { RequestHandler } from 'express';
import { HttpStatus } from '../constant';
import { RabbitMqService, userService } from '../services';
// import { RabbitQueues } from '../interface';
import { logger } from '../config/logger';

@injectable()
export class AuthController {
  constructor(private readonly rabbitMqService: RabbitMqService) {}

  public registerUser: RequestHandler = async (req, res) => {
    try {
      const data = await userService.registerUser(req.body);
      return res.json({
        status:data.status,
        message:data.message
      });
    } catch (err: unknown) {
      logger.error('AuthController:: registerUser', err);
      return res.json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: (err as Error)?.message,
      });
    }
  };
}
