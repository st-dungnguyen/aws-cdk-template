import { Construct } from 'constructs';
import { ApiGatewayProps } from '../props';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { EnvironmentVariables } from '../../../environments/env';

export class TodoApiGateway {
  api: apigw.RestApi
  constructor(scope: Construct, props: ApiGatewayProps, env: EnvironmentVariables) {
    this.api = new apigw.RestApi(scope, `todo-${env.DEPLOY_ENVIRONMENT}-apigateway`, {
      deployOptions: {
        accessLogDestination: new apigw.LogGroupLogDestination(props.apiGatewayLogs),
        accessLogFormat: apigw.AccessLogFormat.jsonWithStandardFields()
      }
    });
    this.api.root.addMethod('any');
  }
}
