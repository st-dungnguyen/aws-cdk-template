import { Construct } from 'constructs';
import { LambdaProps } from '../props';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { EnvironmentVariables } from '../../../environments/env';
export class UserFunction{
  constructor(scope: Construct, props: LambdaProps, env: EnvironmentVariables) {
    // Get API Gateway
    const api = props.userApiGateway.api;
    const resources = api.root.addResource('users');
    const resource = resources.addResource('{id}')

    // Create Lambda Layers
    const layers = new lambda.LayerVersion(scope, 'usersLayer', {
      code: lambda.Code.fromAsset('./layers'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X]
    });

    // Get DynamoDB table from AWS by table name
    const usersTable = dynamodb.Table.fromTableName(scope, 'UsersTable', 'Users');

    // Create Lambda function to list all users
    const userIndexFunction = new lambda.Function(scope, `UserIndexFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users'),
      layers: [layers]
    });
    
    // Mock API Gateway with Lambda function
    resources.addMethod('GET', new LambdaIntegration(userIndexFunction));

    // Create Lambda function to get user by id
    const userShowFunction = new lambda.Function(scope, `UserShowFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'show.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users'),
      layers: [layers]
    });

    // Mock API Gateway with Lambda function
    resource.addMethod('GET', new LambdaIntegration(userShowFunction));

    // Create Lambda function to create new user
    const userCreateFunction = new lambda.Function(scope, `UserCreateFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'create.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users')
    });

    // Mock API Gateway with Lambda function
    resources.addMethod('POST', new LambdaIntegration(userCreateFunction));

    // Create Lambda function to update existence user by id
    const userUpdateFunction = new lambda.Function(scope, `UserUpdateFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'update.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users')
    });

    // Mock API Gateway with Lambda function
    resource.addMethod('PUT', new LambdaIntegration(userUpdateFunction));

    // Create Lambda function to delete existence user by id
    const userDeleteFunction = new lambda.Function(scope, `UserDeleteFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'delete.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/users')
    });

    // Mock API Gateway with Lambda function
    resource.addMethod('DELETE', new LambdaIntegration(userUpdateFunction));
    
    // DynamoDB grant access permission to Lambda Function
    usersTable.grantReadData(userIndexFunction);
    usersTable.grantReadData(userShowFunction);
  }
}
