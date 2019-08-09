import * as cfenv from 'cfenv';

import { IServiceCredentials } from '../../../../interfaces';
import { CloudFoundryServiceType } from '../enums';
import { serviceTypeMapper } from './service-types.mapper';

export const mapRabbitMqCredentials = (cloudFoundryService: cfenv.IService): IServiceCredentials => {
  const credentials = cloudFoundryService.credentials as cfenv.IRabbitMqCredentials;

  return {
    serviceType: serviceTypeMapper.get(CloudFoundryServiceType.RabbitMq),
    name: cloudFoundryService.name,
    uri: credentials.http_api_uri,
    host: credentials.hostname,
    port: credentials.management_port,
    username: credentials.username,
    password: credentials.password,
  };
};
