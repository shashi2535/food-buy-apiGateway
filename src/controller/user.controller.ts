import { injectable } from 'tsyringe';
import { RequestHandler } from 'express';
import { RabbitMqService, userService } from '../services';
import { logger } from '../config/logger';

@injectable()
export class AuthController {
  constructor(private readonly rabbitMqService: RabbitMqService) {}

  public registerUser: RequestHandler = async (req, res, next) => {
    try {
      const data = await userService.registerSeller(req.body);
      if(data.status === true){
        this.rabbitMqService.sendMessageToQueue('USER_NOTIFICATION',data.result);
        return res.json({
          status:data.status,
          message:data.message
        });
      }else{
        return res.json({
          status:data.status,
          message:data.message
        });
      }
    } catch (err: unknown) {
      logger.error('AuthController:: registerUser', err);
      next(err);
    }
  };

  public verifyOtp:RequestHandler = async(req, res, next)=>{
    try{
      const data = await userService.verifyOtp(req.body);
      return res.json({...data});
    } catch (err: unknown) {
      logger.error('AuthController:: verifyOtp', err);
      next(err);
    }
  };
 
  public resendTokenOnMail:RequestHandler = async(req, res, next)=>{
    try{
      req.body.type = 'email';
      const data = await userService.resendOtp(req.body);
      if(data.status === true){
        this.rabbitMqService.sendMessageToQueue('USER_NOTIFICATION',data.result);
        return res.json({
          status:data.status,
          message:data.message
        });
      }else{
        return res.json({
          status:data.status,
          message:data.message
        });
      }
    }catch (err: unknown) {
      logger.error('AuthController:: verifyOtp', err);
      next(err);
    }
  };
  public loginOwner:RequestHandler = async(req, res, next)=>{
    try{
      const data = await userService.loginOwner(req.body);
      if(data.status === true){
        this.rabbitMqService.sendMessageToQueue('USER_NOTIFICATION',data.result);
        return res.json({
          status:data.status,
          message:data.message
        });
      }
      return res.json({
        ...data
      });
    }catch (err: unknown) {
      logger.error('AuthController:: verifyOtp', err);
      next(err);
    }
  };
}
