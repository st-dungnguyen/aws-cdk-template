import { Construct } from 'constructs';
import { InfraStackProps } from '../props';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { EnvironmentVariables } from '../../../environments/env';

export class TodoApiGateway {
  api: apigw.RestApi
  constructor(scope: Construct, props: InfraStackProps, env: EnvironmentVariables, cross: any = {}) {
    this.api = new apigw.RestApi(scope, `project-name-${process.env.DEPLOY_ENVIRONMENT}-todos-apigateway`, {
      deployOptions: {
        accessLogDestination: new apigw.LogGroupLogDestination(cross.apiMonitor),
        accessLogFormat: apigw.AccessLogFormat.jsonWithStandardFields()
      }
    });
    this.api.root.addMethod('any');
  }
}
