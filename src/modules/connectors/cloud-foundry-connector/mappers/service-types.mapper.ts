import { ServiceType } from '../../../../enums';
import { CloudFoundryServiceType } from '../enums';

export const serviceTypeMapper = new Map<CloudFoundryServiceType, ServiceType>();

serviceTypeMapper.set(CloudFoundryServiceType.Mongodb2, ServiceType.Mongodb);
serviceTypeMapper.set(CloudFoundryServiceType.Redis2, ServiceType.Redis);
