export interface IQueueBackingQueueStatus {
  avg_ack_egress_rate: number;
  avg_ack_ingress_rate: number;
  avg_egress_rate: number;
  avg_ingress_rate: number;
  delta: any[];
  len: number;
  mirror_seen: number;
  mirror_senders: number;
  mode: string;
  next_seq_id: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  target_ram_count: string;
}
