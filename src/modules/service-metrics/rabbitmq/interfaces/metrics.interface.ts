import { IOverview } from './overview/overview.interface';
import { IQueue } from './queue/queue.interface';

export interface IMetrics {
  overview: IOverview;
  queues: IQueue[];
}
