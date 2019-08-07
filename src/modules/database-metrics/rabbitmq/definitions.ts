import { IMetricDefinition } from '../interfaces/metric-definition.interface';
import { IMetrics } from './interfaces/metrics.interface';
import { IQueue } from './interfaces/queue/queue.interface';

const getQueueTags = (queue: IQueue) => ([`rabbitmq_queue:${queue.name}`, `rabbitmq_node:${queue.node}`]);

export const rabbitMqDefinitions: IMetricDefinition[] = [
  {
    metric: 'queue.messages',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.messages,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.messages_details.rate',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.messages_details.rate,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.consumers',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.consumers,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.consumer_utilisation',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.consumer_utilisation || 0,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.messages_ready',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.messages_ready,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.message_bytes_ready',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.message_bytes_ready,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.messages_persistent',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.messages_persistent,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.message_bytes_persistent',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.message_bytes_persistent,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.messages_ram',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.messages_ram,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.message_bytes_ram',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.message_bytes_ram,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.messages_unacknowledged',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.messages_unacknowledged,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'queue.memory',
    getValues: (metrics: IMetrics) => metrics.queues.map(queue => ({
      value: queue.memory,
      tags: getQueueTags(queue),
    })),
  },
  {
    metric: 'rabbitmq_version',
    getValues: (metrics: IMetrics) => [{ value: metrics.overview.rabbitmq_version }],
  },
];
