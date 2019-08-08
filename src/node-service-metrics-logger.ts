import { ServiceMetricsEvent, ServiceType } from './enums';
import { logger } from './helpers/logger';
import { PubSub } from './helpers/pub-sub';
import { IMetricsResponse, IServiceCredentials, INodeServiceMetricsLoggerConfig } from './interfaces';
import { MongoDbAgent } from './modules/service-metrics/mongodb/agent';
import { RabbitMqAgent } from './modules/service-metrics/rabbitmq/agent';
import { RedisAgent } from './modules/service-metrics/redis/agent';
import { ITransportInterface } from './modules/transports/interfaces/transport-interface';

export class NodeServiceMetricsLogger extends PubSub {
  private serviceCredentials: IServiceCredentials[];
  private dbMetricsAgents: (MongoDbAgent | RedisAgent | RabbitMqAgent)[] = [];
  private transports: ITransportInterface[];

  constructor(config: INodeServiceMetricsLoggerConfig) {
    super();
    this.serviceCredentials = config.serviceCredentials;
    this.transports = config.transports || [];
  }

  public start(): void {
    logger.subscribe(undefined, value => this.publish(ServiceMetricsEvent.Logs, value));

    this.serviceCredentials.forEach(credentials => {
      const agent = this.getServiceMetricsAgent(credentials);

      if (agent) {
        agent.getMetrics().subscribe(undefined, (metrics: IMetricsResponse) => {
          this.publish(ServiceMetricsEvent.Metrics, metrics);
          this.executeTransports(metrics);
        });

        this.dbMetricsAgents.push(agent);
      }
    });
  }

  public stop(): void {
    this.unsubscribeAll();
    this.dbMetricsAgents.forEach(agent => agent.stop());
    this.dbMetricsAgents = [];
    logger.unsubscribeAll();
  }

  private getServiceMetricsAgent(credentials: IServiceCredentials): any {
    switch (credentials.serviceType) {
      case ServiceType.Mongodb:
        return new MongoDbAgent(credentials);
      case ServiceType.Redis:
        return new RedisAgent(credentials);
      case ServiceType.RabbitMq:
        return new RabbitMqAgent(credentials);
      default:
        return undefined;
    }
  }

  private executeTransports(metrics: IMetricsResponse): void {
    if (this.transports) {
      this.transports.forEach(transport => transport.post(metrics));
    }
  }
}
