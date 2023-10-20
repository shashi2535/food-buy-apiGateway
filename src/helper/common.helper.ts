import { injectable } from 'tsyringe';

@injectable()
export class CommonHelper {
  prepareHealthResponse(responses: any[]) {
    return responses?.reduce(
      (acc: any, curr: any) => {
        acc[curr.message] = curr.status;
        return acc;
      },
      { Apigateway: true }
    );
  }
}
