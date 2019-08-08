import * as cfenv from 'cfenv';

import { ServiceType } from '../../../enums';
import { logger } from '../../../helpers/logger';
import { IServiceCredentials } from '../../../interfaces';
import { CloudFoundryServiceType } from './enums';
import { mapMongodbCredentials } from './mappers/mongodb-credentials.mapper';
import { mapRedisCredentials } from './mappers/redis-credentials.mapper';
import { serviceTypeMapper } from './mappers/service-types.mapper';
import { mapRabbitMqCredentials } from './mappers/rabbitmq-credentials.mapper';

export interface ICloudFoundryOptions {
  vcap?: {};
  vcapFile?: string;
}

export class CloudFoundryConnector {
  private appEnvironment: cfenv.IAppEnv;

  constructor(
    options: ICloudFoundryOptions = {}
  ) {
    this.appEnvironment = cfenv.getAppEnv({ vcap: options.vcap, vcapFile: options.vcapFile });
  }

  public getCredentials(): IServiceCredentials[] {
    const cloudFoundryServices = this.getCloudFoundryServices();

    return cloudFoundryServices
      .filter(service => !!serviceTypeMapper.get(service.label as CloudFoundryServiceType))
      .map(service => this.mapCloudFoundryCredentials(service));
  }

  private getCloudFoundryServices(): cfenv.IService[] {
    const services = this.appEnvironment.getServices();
    const serviceValues = Object.keys(services).map(key => services[key]);

    if (!serviceValues.length) {
      logger.info('no bound services found');
    }

    return serviceValues;
  }

  private mapCloudFoundryCredentials(cloudFoundryService: cfenv.IService): IServiceCredentials | undefined {
    const serviceType = serviceTypeMapper.get(cloudFoundryService.label as CloudFoundryServiceType);

    switch (serviceType) {
      case ServiceType.Mongodb:
        return mapMongodbCredentials(cloudFoundryService);
      case ServiceType.Redis:
        return mapRedisCredentials(cloudFoundryService);
      case ServiceType.RabbitMq:
        return mapRabbitMqCredentials(cloudFoundryService);
      default:
        return;
    }
  }
}
