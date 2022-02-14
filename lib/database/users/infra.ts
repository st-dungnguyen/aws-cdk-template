
import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { DatabaseProps } from "../props";

export class UsersTable {
  constructor(scope: Construct, props: DatabaseProps) {
    const usersTable = new dynamodb.Table(scope, 'UsersTable', {
      tableName: 'Users',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.NUMBER
      }
    });
  }
}