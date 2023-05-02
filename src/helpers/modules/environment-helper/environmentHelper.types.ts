import { WithPrefix } from '../../../types';

export type SetServiceEnvironment = { production: WithPrefix<'http'>; staging: WithPrefix<'http'>; development: WithPrefix<'http'> };
