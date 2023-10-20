import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { GRPC_META_KEY, NODE_ENV } from './../constant';

export class GrpcInitiate {
  private protoPath: string;
  private packageName: string;
  private packageDefinition: any;
  private metadata: any;
  private service: any;
  private serviceName: any;
  private client: any;
  private localPort: number | undefined;

  constructor(protoPath: string, packageName: string, serviceName: string | undefined, localPort: number | undefined) {
    this.protoPath = protoPath;
    this.packageName = packageName;
    this.serviceName = serviceName;
    this.localPort = localPort;

    this.packageDefinition = protoLoader.loadSync(this.protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      arrays: true,
    });
    this.service = (grpc.loadPackageDefinition(this.packageDefinition) as any)[this.packageName][this.serviceName];
    this.metadata = new grpc.Metadata();

    this.initiateConnection();
  }

  getConnection = () => {
    if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
      return this.localPort ? `localhost:${this.localPort}` : 'localhost:8000';
    }
    return `localhost:${process.env.GRPC_USER_URL}`;
  };

  initiateConnection = () => {
    this.metadata.set(GRPC_META_KEY, this.serviceName);
    if (process.env.NODE_ENV !== NODE_ENV.TEST)
      this.client = new this.service(this.getConnection(), grpc.credentials.createInsecure());
  };

  handleClientMethod = (request: any, method: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.client[method](request, this.metadata, (err: any, data: any) => {
        if (err || data.error) {
          reject(err ?? data.error);
        }
        resolve(data);
      });
    });
  };
}
