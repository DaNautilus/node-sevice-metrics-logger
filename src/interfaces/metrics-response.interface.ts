import { ServiceType } from '../enums';

export interface IMetricsResponse {
  serviceType: ServiceType;
  name: string;
  metrics: {};
}
