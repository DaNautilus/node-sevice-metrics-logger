import { DatabaseMetricsEvent } from './enums';
import { DatabaseType } from './enums/database-type.enum';
import { logger } from './helpers/logger';
import { PubSub } from './helpers/pub-sub';
import { IMetricsResponse } from './interfaces';
import { IDatabaseCredentials } from './interfaces/database-credentials.interface';
import {
    IDatabaseMetricsLoggerConfig
} from './interfaces/database-metrics-logger-config.interface';
import { MongoDbAgent } from './modules/database-metrics/mongodb/agent';
import { RabbitMqAgent } from './modules/database-metrics/rabbitmq/agent';
import { RedisAgent } from './modules/database-metrics/redis/agent';
import { ITransportInterface } from './modules/transports/interfaces/transport-interface';

export class DatabaseMetricsLogger extends PubSub {
  private databaseCredentials: IDatabaseCredentials[];
  private dbMetricsAgents: (MongoDbAgent | RedisAgent | RabbitMqAgent)[] = [];
  private transports: ITransportInterface[];

  constructor(config: IDatabaseMetricsLoggerConfig) {
    super();
    this.databaseCredentials = config.databaseCredentials;
    this.transports = config.transports || [];
  }

  public start(): void {
    logger.subscribe(undefined, value => this.publish(DatabaseMetricsEvent.Logs, value));

    this.databaseCredentials.forEach(credentials => {
      const agent = this.getDatabaseMetricsAgent(credentials);

      if (agent) {
        agent.getMetrics().subscribe(undefined, (metrics: IMetricsResponse) => {
          this.publish(DatabaseMetricsEvent.Metrics, metrics);
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

  private getDatabaseMetricsAgent(credentials: IDatabaseCredentials): any {
    switch (credentials.databaseType) {
      case DatabaseType.Mongodb:
        return new MongoDbAgent(credentials);
      case DatabaseType.Redis:
        return new RedisAgent(credentials);
      case DatabaseType.RabbitMq:
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
