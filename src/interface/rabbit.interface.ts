import { ConfirmChannel, Connection } from 'amqplib';

export interface ChannelWithConnection {
  channel: ConfirmChannel;
  connection: Connection;
}

export enum ServiceSource {
  IDENTITY_SERVICE = 'IDENTITY_SERVICE',
  API_GATEWAY_SERVICE = 'API_GATEWAY_SERVICE',
}

export enum RabbitQueues {
  SEND_NOTIFICATION = 'SEND_NOTIFICATION',
  USER_NOTIFICATION = 'USER_NOTIFICATION',
}

export enum RabbitActions {
  CONFIG_UPDATE = 'CONFIG_UPDATE',
  REGISTER = 'USER_REGISTER',
}

export interface RabbitContent {
  uid: number;
  source: ServiceSource;
  queue: RabbitQueues;
  action: any; //RabbitActions;
  metadata: any;
  timestamp: number;
}
