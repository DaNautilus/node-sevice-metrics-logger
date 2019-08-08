import { IChurnRates } from '../churn-rates/churn-rates.interface';
import { IQueueTotals } from '../queue/queue-totals.interface';
import { IObjectTotals } from './object-totals.interface';
import { IOverviewExchangeType } from './overview-exchange-type.interface';
import { IOverviewMessageStats } from './overview-message-stats.interface';
import { IOverviewSampleRetentionPolicies } from './overview-sample-retention-policies.interface';

export interface IOverview {
  management_version: string;
  rates_mode: string;
  sample_retention_policies: IOverviewSampleRetentionPolicies;
  exchange_types: IOverviewExchangeType[];
  rabbitmq_version: string;
  cluster_name: string;
  erlang_version: string;
  erlang_full_version: string;
  message_stats: IOverviewMessageStats;
  churn_rates: IChurnRates;
  queue_totals: IQueueTotals;
  object_totals: IObjectTotals;
  statistics_db_event_queue: number;
}
