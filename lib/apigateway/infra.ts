import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EnvironmentVariables } from '../../environments/env';
import { ApiGatewayProps } from './props';
import { TodoApiGateway } from './todos/infra';

export class ApiGatewayStack extends Stack {
  // define attributes
  todoApiGateway: TodoApiGateway;
  constructor(scope: Construct, id: string, props: ApiGatewayProps, env: EnvironmentVariables) {
    super(scope, id, props)

    // initialize
    this.todoApiGateway = new TodoApiGateway(this, props, env);
  }
}
