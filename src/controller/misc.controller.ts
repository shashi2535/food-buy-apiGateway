import { MiscGrpcService } from '../services/misc.service';
import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { setInitialResponse } from '../utils';

@injectable()
export class MiscController {
  constructor(private readonly miscService: MiscGrpcService) {}
  getEntityByType = async (req: Request, res: Response) => {
    let response = setInitialResponse();
    try {
      // Making grpc call to get entity by type
      response = await this.miscService.getEntityByType({ ...req.body });
    } catch (err) {
      console.log('MiscController::getEntityByType', (err as Error).message);
      response.message = (err as Error).message;
    }
    return res.json(response);
  };
}
