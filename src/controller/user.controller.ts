import { injectable } from 'tsyringe';
import { Request, RequestHandler, Response } from 'express';
import { HttpStatus } from '../constant';
import { userService } from '../service';
@injectable()
export class AuthContoller {
  public signup: RequestHandler = async (req:Request, res:Response) => {
    try {
      // console.log('signup function');
      await  userService.userSignup(req);
    } catch (err:any) {
      return res.json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err?.message,
      });
    }
  };
}
