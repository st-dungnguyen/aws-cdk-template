import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MonitorProps } from './props';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { EnvironmentVariables } from '../../environments/env';

export class MonitorStack extends Stack {
  // define attributes
  logGroup: LogGroup;
  constructor(scope: Construct, id: string, props: MonitorProps, env: EnvironmentVariables) {
    super(scope, id, props)

    // initialize
    this.logGroup = new LogGroup(this, 'LogExample', {});
  }
}
