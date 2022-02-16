import { Construct } from 'constructs';
import { InfraStackProps } from '../infra/props';
import * as logs from 'aws-cdk-lib/aws-logs';
import { EnvironmentVariables } from '../../environments/env';

export class ApiMonitor {
  monitor: logs.LogGroup
  constructor(scope: Construct, props: InfraStackProps, env: EnvironmentVariables) {
    this.monitor = new logs.LogGroup(
      scope, `project-name-${process.env.DEPLOY_ENVIRONMENT}-api-monitor`, {}
    );
  }
}
