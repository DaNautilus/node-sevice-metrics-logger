import { CloudFoundryConnector } from '../../../../src/modules/connectors/cloud-foundry-connector';
import {
  expectedServiceCredentials
} from '../../data/cloud-foundry-connector/expected-service-credentials';
import { vcap } from '../../data/cloud-foundry-connector/vcap';

describe('CloudFoundryConnector', () => {
  test('getCredentials must return an mapped array of service credentials', () => {
    const cloudFoundryConnector = new CloudFoundryConnector({ vcap });

    const credentials = cloudFoundryConnector.getCredentials();

    expect(credentials).toEqual(expectedServiceCredentials);
  });

  test('getCredentials must return an empty array if there are no services bound to cloud foundry application', () => {
    const cloudFoundryConnector = new CloudFoundryConnector();

    const credentials = cloudFoundryConnector.getCredentials();

    expect(credentials).toEqual([]);
  });
});
