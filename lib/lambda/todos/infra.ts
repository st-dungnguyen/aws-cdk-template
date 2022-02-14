import { Construct } from 'constructs';
import { LambdaProps } from '../props';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { EnvironmentVariables } from '../../../environments/env';
export class TodosFunction{
  constructor(scope: Construct, props: LambdaProps, env: EnvironmentVariables) {
    // Get API Gateway
    const api = props.todoApiGateway.api;
    const resources = api.root.addResource('todos');
    const resource = resources.addResource('{id}')

    // Create Lambda Layers
    const layer = new lambda.LayerVersion(scope, `todos-${env.DEPLOY_ENVIRONMENT}-lambda-layer`, {
      code: lambda.Code.fromAsset('./layers'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X]
    });

    // Get DynamoDB table from AWS by table name
    const todosTable = dynamodb.Table.fromTableName(
      scope, `todos-${env.DEPLOY_ENVIRONMENT}-dynamodb`, env.TODOS_TABLE
    );

    // List all todo items function
    const listTodosFunction = new lambda.Function(
      scope,
      `list-todos-${env.DEPLOY_ENVIRONMENT}-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/index.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: todosTable.tableName
        }
      }
    );

    // Get todo item function
    const getTodoFunction = new lambda.Function(
      scope,
      `get-todo-${env.DEPLOY_ENVIRONMENT}-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/show.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: todosTable.tableName
        }
      }
    );

    // Create todo item function
    const createTodoFunction = new lambda.Function(
      scope,
      `create-todo-${env.DEPLOY_ENVIRONMENT}-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/create.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: todosTable.tableName
        }
      }
    );

    // Update todo item function
    const updateTodoFunction = new lambda.Function(
      scope,
      `update-todo-${env.DEPLOY_ENVIRONMENT}-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/update.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: todosTable.tableName
        }
      }
    );

    // Create Lambda function to delete existence user by id
    const deleteTodoFunction = new lambda.Function(
      scope,
      `delete-todo-${env.DEPLOY_ENVIRONMENT}-function`,
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'lambda/todos/delete.handler',
        code: lambda.Code.fromAsset('./dist/src'),
        layers: [layer],
        environment: {
          TABLE_NAME: todosTable.tableName
        }
      }
    );

    // Mock API Gateway with Lambda function
    resources.addMethod('GET', new LambdaIntegration(listTodosFunction));
    resource.addMethod('GET', new LambdaIntegration(getTodoFunction));
    resources.addMethod('POST', new LambdaIntegration(createTodoFunction));
    resource.addMethod('PUT', new LambdaIntegration(updateTodoFunction));
    resource.addMethod('DELETE', new LambdaIntegration(deleteTodoFunction));
    
    // DynamoDB grant access permission to Lambda Function
    todosTable.grantReadData(listTodosFunction);
    todosTable.grantReadData(getTodoFunction);
    todosTable.grantReadWriteData(createTodoFunction);
    todosTable.grantReadWriteData(updateTodoFunction);
    todosTable.grantReadWriteData(deleteTodoFunction);
  }
}
