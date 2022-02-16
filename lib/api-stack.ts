import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiStackProps } from './api/props';
import { EnvironmentVariables } from '../environments/env';
import { TodosFunction } from './api/lambda/todos';

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps, env: EnvironmentVariables) {
    super(scope, id, props)

    this.initLambdaFunctions(props, env);
  }
  
  initLambdaFunctions(props: ApiStackProps, env: EnvironmentVariables) {
    new TodosFunction(this, props, env);
  }
}
