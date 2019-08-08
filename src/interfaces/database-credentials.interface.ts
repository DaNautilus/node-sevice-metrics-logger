import { ServiceType } from '../enums';

export interface IDatabaseCredentials {
  databaseType: ServiceType;
  name?: string;
  host?: string;
  port?: number;
  uri?: string;
  username?: string;
  password?: string;
  database?: string;
  interval?: number;
}
