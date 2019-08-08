import { ServiceType } from '../../../enums';
import { Rest } from '../../../helpers/rest';
import { IMetricsResponse } from '../../../interfaces';
import { IMetricValue } from '../../database-metrics/interfaces/metric-value.interface';
import { mongoDbDefinition } from './database-definitions/mongodb-definition';
import { rabbitMqDefinition } from './database-definitions/rabbitmq-definition';
import { redisDefinition } from './database-definitions/redis-definition';
import { DefaultHost } from './enums/default-hosts.enum';
import { IDatadogOptions } from './interfaces/datadog-options';
import { IServiceDefinition } from './interfaces/service-definition.interface';

export abstract class DatadogTransportAbstract {
  public rest: Rest;

  constructor(private config: IDatadogOptions) {
    const host = config.host || DefaultHost.Host;

    this.rest = new Rest({
      host: `https://${host}/api/v1`,
      query: { api_key: config.apiKey, application_key: config.appKey },
    });
  }

  public getServiceDefinition(serviceType: ServiceType): IServiceDefinition {
    switch (serviceType) {
      case ServiceType.Redis:
        return redisDefinition;
      case ServiceType.Mongodb:
        return mongoDbDefinition;
      case ServiceType.RabbitMq:
        return rabbitMqDefinition;
      default:
        return;
    }
  }

  public getTags(metrics: IMetricsResponse, metricValue?: IMetricValue): string[] {
    return [
      ...this.mapTags(metrics),
      ...(metricValue && metricValue.tags || []),
      `service-type:${metrics.serviceType}`,
      `service-name:${metrics.name}`,
      ...this.config.tags || [],
    ];
  }

  private mapTags(metrics: IMetricsResponse): string[] {
    const serviceDefinition = this.getServiceDefinition(metrics.serviceType);
    const tagKeys = serviceDefinition.tagMaps ? Object.keys(serviceDefinition.tagMaps) : [];
    let tags = [];

    tagKeys.forEach(tagKey => {
      const metricValues = metrics.metrics[serviceDefinition.tagMaps[tagKey]];
      tags = [...tags, ...this.getTagsFromMetricValues(tagKey, metricValues)];
    });

    return tags;
  }

  private getTagsFromMetricValues(tagKey: string, metricValues: IMetricValue[]): string[] {
    return metricValues.map(metricValue => `${tagKey}:${metricValue.value || ''}`);
  }
}
