import { injectable } from 'tsyringe';
import { RequestHandler } from 'express';
import { HttpStatus } from '../constant';
import { RabbitMqService, userService } from '../service';
// import { RabbitQueues } from '../interface';
import { logger } from '../config/logger';
@injectable()
export class AuthController {
  constructor(private readonly rabbitMqService: RabbitMqService) {}
  public signup: RequestHandler = async (req, res) => {
    try {
      const data =  await  userService.userSignup(req);
      logger.info('signup function',data);
    } catch (err:any) {
      logger.error('errr', err);
      return res.json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err?.message,
      });
    }
  };
}
