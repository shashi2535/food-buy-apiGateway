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
      if(data.status === true && data.result.isEmailLogin === true){
        this.rabbitMqService.sendMessageToQueue('USER_NOTIFICATION',data.result);
        return res.json({...data});
      }
      return res.json({
        status:data.status,
        message:data.message
      });
      
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
      if(Object.keys(req.body).length ===0){
        return res.json({
          status:false,
          message:'Email Or Phone Provided Please.'
        });
      }
      if(req.body.email && req.body.phone){
        return res.json({
          status:false,
          message:'Something Went Wrong'
        });
      }
      const data = await userService.resendOtp(req.body);
      console.log(data);
      if(data.status === true && data.result.isEmailLogin=== true){
        console.log('is email login>>>');
        this.rabbitMqService.sendMessageToQueue('USER_NOTIFICATION',data.result);
        return res.json({
          status:data.status,
          message:data.message
        });
      }     
      if(data.status === true && data.isPhoneLogin=== true){
        console.log('is phone login>>>');
        // this.rabbitMqService.sendMessageToQueue('USER_NOTIFICATION',data.result);
        return res.json({
          status:data.status,
          message:data.message
        });
      }
      return res.json({
        status:data.status,
        message:data.message,
        result:data?.result
      });
    }catch (err: unknown) {
      logger.error('AuthController:: verifyOtp', err);
      next(err);
    }
  };
  public loginOwner:RequestHandler = async(req, res, next)=>{
    try{
      if(Object.keys(req.body).length <2){
        return res.json({
          status:false,
          message:'Email Or Phone Provided Please.'
        });
      }
      if(req.body.email && req.body.phone){
        return res.json({
          status:false,
          message:'Something Went Wrong'
        });
      }
      const data = await userService.loginOwner(req.body);
      if(data.status === true && data.result.isEmailLogin=== true){
        console.log('is email login>>>');
        this.rabbitMqService.sendMessageToQueue('USER_NOTIFICATION',data.result);
        return res.json({
          status:data.status,
          message:data.message
        });
      }
      if(data.status === true && data.result.isPhoneLogin=== true){
        console.log('is phone login>>>');
        // this.rabbitMqService.sendMessageToQueue('USER_NOTIFICATION',data.result);
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
