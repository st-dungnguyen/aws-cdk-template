export interface EnvironmentVariables {
  TODOS_TABLE: string,
  TODOS_PKEY: string,
}

export const env: EnvironmentVariables = {
  TODOS_TABLE: process.env.TODOS_TABLE || '',
  TODOS_PKEY: process.env.TODOS_PKEY || '',
};
