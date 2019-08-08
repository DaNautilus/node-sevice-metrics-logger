import { IMessagesDetails } from '../messages/messages-details.interface';
import { IMessagesReadyDetails } from '../messages/messages-ready-details.interface';
import {
    IMessagesUnacknowledgedDetails
} from '../messages/messages-unacknowledged-details.interface';

export interface IQueueTotals {
  messages: number;
  messages_details: IMessagesDetails;
  messages_ready: number;
  messages_ready_details: IMessagesReadyDetails;
  messages_unacknowledged: number;
  messages_unacknowledged_details: IMessagesUnacknowledgedDetails;
}
