import { Construct } from 'constructs';
import { ApiStackProps } from '../props';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { EnvironmentVariables } from '../../../environments/env';
import { ApiLayer } from './layer/api-layer';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';

const DEPLOY_ENVIRONMENT = process.env.DEPLOY_ENVIRONMENT;

export class TodosFunction {
  index: lambda.Function;
  show: lambda.Function;
  create: lambda.Function;
  update: lambda.Function;
  delete: lambda.Function;
  constructor(scope: Construct, props: ApiStackProps, env: EnvironmentVariables) {
    // Get API Gateway
    // *Note: Prefer getting service from Attributes 
    const api = props.infraStack.todosApiGateway;
    // Create Lambda Layers
    const layer = new ApiLayer(scope, props, env).layer;

    // Get DynamoDB table from AWS by table name
    const todosTable = dynamodb.Table.fromTableName(scope, `project-name-${DEPLOY_ENVIRONMENT}-todos-table`, env.TODOS_TABLE);

    // Create Lambda Functions
    this.createLambdaFunctions(scope, env, layer, todosTable);

    // Mock API Gateway with Lambda function
    this.mockLambdaFunctions(api);
    
    // DynamoDB grant access permission to Lambda Function
    this.grantPermissions(todosTable);
  }
  createLambdaFunctions(scope: Construct, env:EnvironmentVariables, layer: lambda.LayerVersion, table: dynamodb.ITable) {
    // List all todo items function
    this.index = new lambda.Function(
      scope
      ,
      `project-name-${DEPLOY_ENVIRONMENT}-todo-list-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/index.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: table.tableName
        }
      }
    );

    // Get todo item function
    this.show = new lambda.Function(
      scope,
      `project-name-${DEPLOY_ENVIRONMENT}-get-todo-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/show.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: table.tableName,
          PRIMARY_KEY: env.TODOS_PKEY,
        }
      }
    );

    // Create todo item function
    this.create = new lambda.Function(
      scope,
      `project-name-${DEPLOY_ENVIRONMENT}-create-todo-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/create.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: table.tableName,
          PRIMARY_KEY: env.TODOS_PKEY,
        }
      }
    );

    // Update todo item function
    this.update = new lambda.Function(
      scope,
      `project-name-${DEPLOY_ENVIRONMENT}-update-todo-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/update.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: table.tableName,
          PRIMARY_KEY: env.TODOS_PKEY,
        }
      }
    );

    // Create Lambda function to delete existence user by id
    this.delete = new lambda.Function(
      scope,
      `project-name-${DEPLOY_ENVIRONMENT}-delete-todo-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/delete.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: table.tableName,
          PRIMARY_KEY: env.TODOS_PKEY
        }
      }
    );
  }

  mockLambdaFunctions(api: RestApi) {
    const resources = api.root.addResource('todos');
    const resource = resources.addResource('{id}')
    resources.addMethod('GET', new LambdaIntegration(this.index));
    resource.addMethod('GET', new LambdaIntegration(this.show));
    resources.addMethod('POST', new LambdaIntegration(this.create));
    resource.addMethod('PUT', new LambdaIntegration(this.update));
    resource.addMethod('DELETE', new LambdaIntegration(this.delete));
  }

  grantPermissions(table: dynamodb.ITable) {
    table.grantReadData(this.index);
    table.grantReadData(this.show);
    table.grantReadWriteData(this.create);
    table.grantReadWriteData(this.update);
    table.grantReadWriteData(this.delete);
  }
}
