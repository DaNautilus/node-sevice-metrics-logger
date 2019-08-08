import {
    IOverviewMessageStatsDiskReadsDetails
} from './overview-message-stats-disk-reads-details.interface';
import {
    IOverviewMessageStatsDiskWritesDetails
} from './overview-message-stats-disk-writes-details.interface';

export interface IOverviewMessageStats {
  disk_reads: number;
  disk_reads_details: IOverviewMessageStatsDiskReadsDetails;
  disk_writes: number;
  disk_writes_details: IOverviewMessageStatsDiskWritesDetails;
}
