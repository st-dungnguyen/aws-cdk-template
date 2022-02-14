import * as cloudwatch from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { BaseProps } from '../props';

export class ApiLogs {
  apiLogs: cloudwatch.LogGroup;
  constructor(scope: Construct, props: BaseProps) {
    this.apiLogs = new cloudwatch.LogGroup(scope, `ApiLogs-${props.deployEnvironment}`);
  }
}
