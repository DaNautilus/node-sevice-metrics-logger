import * as cfenv from 'cfenv';

import { IServiceCredentials } from '../../../../interfaces';
import { CloudFoundryServiceType } from '../enums';
import { serviceTypeMapper } from './service-types.mapper';

export const mapMongodbCredentials = (cloudFoundryService: cfenv.IService): IServiceCredentials => {
  const credentials = cloudFoundryService.credentials as cfenv.IMongodbCredentials;

  return {
    serviceType: serviceTypeMapper.get(CloudFoundryServiceType.Mongodb2),
    name: cloudFoundryService.name,
    host: credentials.host,
    uri: credentials.database_uri,
    username: credentials.username,
    password: credentials.password,
    database: credentials.database,
  };
};
