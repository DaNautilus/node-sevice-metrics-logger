import { logger } from '../../../helpers/logger';
import { Poller } from '../../../helpers/poller';
import { Rest } from '../../../helpers/rest';
import { IServiceCredentials } from '../../../interfaces';
import { DatabaseMetrics } from '../database-metrics';
import { rabbitMqDefinitions } from './definitions';
import { IMetrics } from './interfaces/metrics.interface';
import { IOverview } from './interfaces/overview/overview.interface';
import { IQueue } from './interfaces/queue/queue.interface';

const rabbitMqDefaultInterval = 60000;

export class RabbitMqAgent extends DatabaseMetrics {
  private rest: Rest;

  constructor(
    credentials: IServiceCredentials
  ) {
    super(credentials, rabbitMqDefinitions);

    const host = credentials.uri || `http://${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port}/api`;
    this.rest = new Rest({ host });
  }

  public getMetrics(): RabbitMqAgent {
    const metricsPoller = new Poller({
      id: Poller.pollerIds.rabbitmq,
      interval: this.credentials.interval || rabbitMqDefaultInterval,
    });

    metricsPoller.onPoll(this.onPollMetrics.bind(this));
    this.setPoller(metricsPoller);
    this.pollById(Poller.pollerIds.rabbitmq);

    return this;
  }

  public disconnect(): void {
    return;
  }

  private async onPollMetrics(): Promise<void> {
    const promises = [];

    promises.push(this.rest.get<IOverview>('/overview'));
    promises.push(this.rest.get<IQueue[]>('/queues'));

    try {
      const [overview, queues] = await Promise.all(promises);
      const metrics: IMetrics = { overview, queues };

      this.publishMetrics(metrics);
      this.pollById(Poller.pollerIds.rabbitmq);
    } catch (error) {
      logger.error(error);
      this.stop();
    }
  }
}
