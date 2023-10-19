import { injectable } from 'tsyringe';
import { RequestHandler } from 'express';
import { HttpStatus } from '../constant';
import { RabbitMqService, userService } from '../service';
// import { RabbitQueues } from '../interface';
@injectable()
export class AuthController {
  constructor(private readonly rabbitMqService: RabbitMqService) {}
  public signup: RequestHandler = async (req, res) => {
    try {
      await userService.userSignup(req);
      // await this.rabbitMqService.sendMessageToQueue(RabbitQueues.USER_NOTIFICATION, {});
    } catch (err: any) {
      return res.json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err?.message,
      });
    }
  };
}
