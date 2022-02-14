import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EnvironmentVariables } from '../../environments/env';
import { DatabaseProps } from './props';
import { TodosTable } from './todos/infra';
export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props: DatabaseProps, env: EnvironmentVariables) {
    super(scope, id, props)

    const usersTable = new TodosTable(this, props, env);
  }
}
