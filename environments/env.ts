export interface EnvironmentVariables {
  DEPLOY_ENVIRONMENT: string,
  TODOS_TABLE: string,
  TODOS_PKEY: string,
}

export const env: EnvironmentVariables = {
  DEPLOY_ENVIRONMENT: process.env.DEPLOY_ENVIRONMENT || 'stg',
  TODOS_TABLE: process.env.TODOS_TABLE || 'Todos',
  TODOS_PKEY: process.env.TODOS_PKEY || 'id',
};
