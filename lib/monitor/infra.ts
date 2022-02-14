import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MonitorProps } from './props';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { EnvironmentVariables } from '../../environments/env';

export class MonitorStack extends Stack {
  // define attributes
  apiGatewayLogs: LogGroup;
  constructor(scope: Construct, id: string, props: MonitorProps, env: EnvironmentVariables) {
    super(scope, id, props)

    // initialize
    this.apiGatewayLogs = new LogGroup(
      this, `apigateway-${env.DEPLOY_ENVIRONMENT}-log-group`, {}
    );
  }
}
