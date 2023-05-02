import { EnvironmentVariables } from '../../../constants/types';
import { CONSTANTS } from '../../../constants';
import { SetServiceEnvironment } from './environmentHelper.types';

const { PRODUCTION, DEVELOPMENT, STAGING } = CONSTANTS.ENVIRONMENT;

function getMode() {
  switch (window.location.hostname) {
    case 'app.theinvestormachine.com': {
      return PRODUCTION;
    }
    case 'stage.app.theinvestormachine.com': {
      return STAGING;
    }
    case 'localhost': {
      return DEVELOPMENT;
    }
    default: {
      return DEVELOPMENT;
    }
  }
}

const environmentHelper = {
  environment: getMode(),
  getEnvVariable(variableName: EnvironmentVariables) {
    return process.env[String(variableName)] ?? '';
  },
  setServiceEnvironment({ production, staging, development }: SetServiceEnvironment) {
    const serviceEnvironment = {
      production,
      staging,
      development,
    };
    return serviceEnvironment[getMode()];
  },
};

export default environmentHelper;
