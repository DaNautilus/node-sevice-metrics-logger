import { LogStatus } from '../enums';
import { IDatabaseDefinition } from '../interfaces/database-definition.interface';

export const rabbitMqDefinition: IDatabaseDefinition = {
  metricMaps: {
    // status by host
    // 'rabbitmq.aliveness': '',

    // integration status
    // 'rabbitmq.status': '',

    // disk alarm
    // 'rabbitmq.node.disk_alarm': '',

    // memory alarm
    // 'rabbitmq.node.mem_alarm': '',

    // messages that move in or out of a queue per second.
    'rabbitmq.queue.messages.rate': 'queue.messages_details.rate',

    // messages publish rate per second
    // 'rabbitmq.queue.messages.publish.rate': '',

    // messages delivery rate per second
    // 'rabbitmq.queue.messages.deliver.rate': ''

    // messages acknowledged rate per second
    // 'rabbitmq.queue.messages.ack.rate': ''

    // proportion of time that the queue can deliver messages to consumers
    'rabbitmq.queue.consumer_utilisation': 'queue.consumer_utilisation',

    // total amount of messages in queue
    'rabbitmq.queue.messages': 'queue.messages',

    // queue memory
    'rabbitmq.queue.memory': 'queue.memory',

    // queue consumers
    'rabbitmq.queue.consumers': 'queue.consumers',

    // number of messages ready to be delivered to clients
    'rabbitmq.queue.messages_ready': 'queue.messages_ready',

    // number of messages delivered to clients but not yet acknowledged
    'rabbitmq.queue.messages_unacknowledged': 'queue.messages_unacknowledged',

    // active queue consumers
    // 'rabbitmq.queue.active_consumers': '',

    // free disk space
    // 'rabbitmq.node.disk_free': '',

    // total file descriptors available
    // 'rabbitmq.node.fd_total': '',

    // used file descriptors
    // 'rabbitmq.node.used': '',

    // memory usable
    // 'system.mem.usable': ''

    //  memory used
    // 'rabbitmq.node.mem_used': '',

    // sockets used
    // 'rabbitmq.node.sockets_used': '',

    // total sockets available
    // 'rabbitmq.node.sockets_total': ''
  },
  logs: [{
    message: 'RabbitMQ Version',
    status: LogStatus.Info,
    ddsource: 'rabbitmq',
    attributesMap: {
      version: 'redis_version',
    },
  }],
  tagMaps: {
    'rabbitmq-version': 'rabbitmq_version',
  },
};
