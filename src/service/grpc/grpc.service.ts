const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

export class GrpcInitiate {
    private protoPath: string;
    private protoName: string;
    private packageDefinition: any;
    private metadata: any;
    private service: any;
    private serviceName: any;
    private client: any;
    private localPort: string | undefined;

    constructor(
        protoPath: string,
        protoName: string,
        serviceName: string | undefined,
        localPort: string | undefined
    ) {
        this.protoPath = protoPath;
        this.protoName = protoName;
        this.serviceName = serviceName;
        this.localPort = localPort;
        console.log("local port", this.localPort)
        this.packageDefinition = protoLoader.loadSync(this.protoPath, {
            keepCase: true,
            longs: String,
            enums: String,
            arrays: true,
        });
        this.service = grpc.loadPackageDefinition(this.packageDefinition)[
            this.protoName
        ];
        this.metadata = new grpc.Metadata();
        this.initiateConnection();
    }

    getConnection = () => {
        if (process.env.NODE_ENV == 'development') {
            return this.localPort
                ? `localhost:${this.localPort}`
                : 'localhost:8000';
        }
        return `localhost:${process.env.GRPC_USER_URL}`;
    };

    initiateConnection = () => {
        this.metadata.set('x-service', this.serviceName);
        if (process.env.NODE_ENV !== 'test')
            this.client = new this.service(
                this.getConnection(),
                grpc.credentials.createInsecure()
            );
    };

    handleClientMethod = (request: any, method: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.client[method](
                request,
                this.metadata,
                (err: any, data: any) => {
                    if (err || data.error) {
                        reject(err ?? data.error);
                    }
                    resolve(data);
                }
            );
        });
    };
}