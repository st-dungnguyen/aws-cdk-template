import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DatabaseProps } from './props';
import { UsersTable } from './users/infra';
export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props: DatabaseProps) {
    super(scope, id, props)

    const usersTable = new UsersTable(this, props);
  }
}
