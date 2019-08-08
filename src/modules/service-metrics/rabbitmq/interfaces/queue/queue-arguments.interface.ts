export interface IQueueArguments {
  'x-dead-letter-exchange': string;
  'x-expires': number;
  'x-message-ttl': number;
}
