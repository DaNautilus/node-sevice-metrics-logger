import * as cfenv from 'cfenv';

import { IServiceCredentials } from '../../../../interfaces';
import { CloudFoundryServiceType } from '../enums';
import { serviceTypeMapper } from './service-types.mapper';

export const mapRabbitMqCredentials = (cloudFoundryService: cfenv.IService): IServiceCredentials => {
  const {management: managementCredentials} = cloudFoundryService.credentials as cfenv.IRabbitMqCredentials;

  return {
    serviceType: serviceTypeMapper.get(CloudFoundryServiceType.RabbitMq),
    name: cloudFoundryService.name,
    uri: managementCredentials.uri,
    host: managementCredentials.host,
    port: managementCredentials.port,
    username: managementCredentials.username,
    password: managementCredentials.password,
  };
};
