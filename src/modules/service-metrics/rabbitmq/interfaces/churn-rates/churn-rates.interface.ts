import { IChannelClosedDetails } from './channel-closed-details';

export interface IChurnRates {
  channel_closed: number;
  channel_closed_details: IChannelClosedDetails;
}
