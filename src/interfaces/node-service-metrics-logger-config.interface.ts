import { ITransportInterface } from '../modules/transports/interfaces/transport-interface';
import { IServiceCredentials } from './service-credentials.interface';

export interface INodeServiceMetricsLoggerConfig {
  serviceCredentials: IServiceCredentials[];
  transports?: ITransportInterface[];
}
