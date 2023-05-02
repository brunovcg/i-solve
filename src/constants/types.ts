import { CONSTANTS } from '../constants';
const { VARIABLES } = CONSTANTS.ENVIRONMENT;

export type EnvironmentVariables = (typeof VARIABLES)[keyof typeof VARIABLES];
