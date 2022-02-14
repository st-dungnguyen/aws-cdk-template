import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaProps } from './props';
import { HomeFunction } from './home/infra';
import { UserFunction } from './users/infra';
import { EnvironmentVariables } from '../../environments/env';
export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaProps, env: EnvironmentVariables) {
    super(scope, id, props)

    const homeFunction = new HomeFunction(this, props, env);
    const userFunction = new UserFunction(this, props, env);
  }
}
