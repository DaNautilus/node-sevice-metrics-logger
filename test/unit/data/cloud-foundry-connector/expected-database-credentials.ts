import {
    CloudFoundryServiceType
} from '../../../../src/modules/connectors/cloud-foundry-connector';
import { vcap } from './vcap';
import { serviceTypeMapper } from '../../../../src/modules/connectors/cloud-foundry-connector/mappers/service-types.mapper';

const mongodbService = vcap.services[CloudFoundryServiceType.Mongodb2][0];
const mongodbCredentials = mongodbService.credentials;

const redisService = vcap.services[CloudFoundryServiceType.Redis2][0];
const redisCredentials = redisService.credentials;

export const expectedCredentials = [
  {
    serviceType: serviceTypeMapper.get(mongodbService.label as CloudFoundryServiceType),
    name: mongodbService.name,
    host: mongodbCredentials.host,
    uri: mongodbCredentials.database_uri,
    username: mongodbCredentials.username,
    password: mongodbCredentials.password,
    database: mongodbCredentials.database,
  },
  {
    serviceType: serviceTypeMapper.get(redisService.label as CloudFoundryServiceType),
    name: redisService.name,
    host: redisCredentials.host,
    port: redisCredentials.port,
    password: redisCredentials.password,
  },
];
