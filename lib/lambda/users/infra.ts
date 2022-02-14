import { Construct } from 'constructs';
import { LambdaProps } from '../props';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export class UserFunction{
  constructor(scope: Construct, props: LambdaProps) {
    const api = props.userApiGateway.api;
    const resources = api.root.addResource('users');
    const resource = resources.addResource('{id}')

    // user index
    const userIndexFunction = new lambda.Function(scope, `UserIndexFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users')
    });

    resources.addMethod('GET', new LambdaIntegration(userIndexFunction));

    // user show
    const userShowFunction = new lambda.Function(scope, `UserShowFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'show.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users')
    });

    resource.addMethod('GET', new LambdaIntegration(userShowFunction));

    // user create
    const userCreateFunction = new lambda.Function(scope, `UserCreateFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'create.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users')
    });

    resources.addMethod('POST', new LambdaIntegration(userCreateFunction));

    // user update
    const userUpdateFunction = new lambda.Function(scope, `UserUpdateFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'update.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users')
    });

    resource.addMethod('PUT', new LambdaIntegration(userUpdateFunction));

    // user update
    const userDeleteFunction = new lambda.Function(scope, `UserDeleteFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'delete.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users')
    });

    resource.addMethod('DELETE', new LambdaIntegration(userUpdateFunction));
  }
}
