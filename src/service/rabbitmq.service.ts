import { ServiceSource, RabbitQueues, RabbitActions, ChannelWithConnection } from '../interface/rabbit.interface';
import amqp from 'amqplib';
import { injectable } from 'tsyringe';

@injectable()
export class RabbitMqService {
  private connection: any = null;
  private channel: any = null;
  private options: any = {};

  connect = async () => {
    try {
      if (!this.connection) {
        // Create a new connection For RabbitMq server
        this.connection = await amqp.connect('amqp://localhost:5672');
        this.channel = await this.connection.createConfirmChannel();

        this.connection.on('error', (err: any) => {
          this.connection = null;
          console.log('****************** RABBIT_MQ CONNECTION ERROR ******************************', err);
        });
        this.connection.on('blocked', () => {
          this.connection = null;
          console.log('****************** RABBIT_MQ CONNECTION blocked ******************************');
        });
        this.connection.on('close', () => {
          this.connection = null;
          console.log('****************** RABBIT_MQ CONNECTION closed ******************************');
        });
      }
      let obj: any = {
        connection: this.connection,
        channel: this.channel,
      };
      return obj;
    } catch (error) {
      this.connection = null;
      if (error instanceof Error) throw error?.message;
      console.log('RabbitMQ Error');
    }
  };

  private createChannel = async (prefetch: number = 10): Promise<ChannelWithConnection> => {
    try {
      const { connection, channel }: any = await this.connect();
      channel.prefetch(prefetch);
      return { connection, channel };
    } catch (ex: any) {
      console.error(ex.message);
      throw ex;
    }
  };

  sendMessageToQueue = async (queue: string, data: unknown) => {
    const { channel } = await this.createChannel();
    await channel.assertQueue(queue, { durable: true });
    const contentData = {
      uuid: 0,
      source: ServiceSource.API_GATEWAY_SERVICE,
      queue: RabbitQueues.SEND_NOTIFICATION,
      action: RabbitActions.REGISTER,
      metadata: data,
      timestamp: Date.now(),
    };
    return channel.sendToQueue(queue, Buffer.from(JSON.stringify(contentData)), {
      persistent: true,
    });
  };
}