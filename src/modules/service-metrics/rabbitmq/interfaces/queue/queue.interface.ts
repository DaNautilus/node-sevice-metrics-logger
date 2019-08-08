import { IMessagesDetails } from '../messages/messages-details.interface';
import { IMessagesReadyDetails } from '../messages/messages-ready-details.interface';
import {
    IMessagesUnacknowledgedDetails
} from '../messages/messages-unacknowledged-details.interface';
import { IQueueArguments } from './queue-arguments.interface';
import { IQueueBackingQueueStatus } from './queue-backing-queue-status.interface';
import { IQueueEffectivePolicyDefinition } from './queue-effective-policy-definition.interface';
import { IQueueGarbageCollection } from './queue-garbage-collection.interface';
import { IQueueReductionsDetails } from './queue-reductions-details.interface';

export interface IQueue {
  arguments: IQueueArguments;
  auto_delete: boolean;
  backing_queue_status: IQueueBackingQueueStatus;
  consumers: number;
  effective_policy_definition: IQueueEffectivePolicyDefinition;
  exclusive: boolean;
  garbage_collection: IQueueGarbageCollection;
  idle_since: string;
  memory: number;
  message_bytes: number;
  message_bytes_paged_out: number;
  message_bytes_persistent: number;
  message_bytes_ram: number;
  message_bytes_ready: number;
  message_bytes_unacknowledged: number;
  messages: number;
  messages_details: IMessagesDetails;
  messages_paged_out: number;
  messages_persistent: number;
  messages_ram: number;
  messages_ready: number;
  messages_ready_details: IMessagesReadyDetails;
  messages_ready_ram: number;
  messages_unacknowledged: number;
  messages_unacknowledged_details: IMessagesUnacknowledgedDetails;
  messages_unacknowledged_ram: number;
  name: string;
  node: string;
  policy: string;
  reductions: number;
  redreductions_details: IQueueReductionsDetails;
  slave_nodes: string[];
  state: string;
  synchronised_slave_nodes: string[];
  vhost: string;
  consumer_utilisation?: number;
  exclusive_consumer_tag?: string;
  head_message_timestamp?: string;
  operator_policy?: string;
  recoverable_slaves?: string;
}
