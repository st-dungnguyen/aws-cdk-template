import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaProps } from './props';
import { TodosFunction } from './todos/infra';
import { EnvironmentVariables } from '../../environments/env';
export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaProps, env: EnvironmentVariables) {
    super(scope, id, props)

    const todosFunction = new TodosFunction(this, props, env);
  }
}
