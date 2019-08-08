import { ServiceType } from '../../../../enums';
import { CloudFoundryServiceType } from '../enums';

export const serviceTypeDatabaseTypeMapper = new Map<CloudFoundryServiceType, ServiceType>();

serviceTypeDatabaseTypeMapper.set(CloudFoundryServiceType.Mongodb2, ServiceType.Mongodb);
serviceTypeDatabaseTypeMapper.set(CloudFoundryServiceType.Redis2, ServiceType.Redis);
