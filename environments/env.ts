export interface EnvironmentVariables {
  DEPLOY_ENVIRONMENT: string,
}

export const env: EnvironmentVariables = {
  DEPLOY_ENVIRONMENT: process.env.DEPLOY_ENVIRONMENT || 'stg',
};
