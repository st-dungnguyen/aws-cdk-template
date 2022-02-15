
import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { DatabaseProps } from "../props";
import { EnvironmentVariables } from "../../../environments/env";

export class TodosTable {
  constructor(scope: Construct, props: DatabaseProps, env: EnvironmentVariables) {
    const usersTable = new dynamodb.Table(scope, `todos-${env.DEPLOY_ENVIRONMENT}-dynamodb`, {
      tableName: env.TODOS_TABLE,
      partitionKey: {
        name: env.TODOS_PKEY,
        type: dynamodb.AttributeType.STRING
      }
    });
  }
}