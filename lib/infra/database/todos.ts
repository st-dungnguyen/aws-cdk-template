
import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { InfraStackProps } from "../props";
import { EnvironmentVariables } from "../../../environments/env";

export class TodosTable {
  table: dynamodb.Table;
  constructor(scope: Construct, props: InfraStackProps, env: EnvironmentVariables) {
    this.table = new dynamodb.Table(scope, `project-name-${process.env.DEPLOY_ENVIRONMENT}-todos-table`, {
      tableName: env.TODOS_TABLE,
      partitionKey: {
        name: env.TODOS_PKEY,
        type: dynamodb.AttributeType.STRING
      }
    });
  }
}