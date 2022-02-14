import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { AccessLogFormat } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { BaseProps } from '../props';
import { ApiLogs } from '../cloudwatch/api-logs';

export class HelloWorldApiGateway {
  api: apigw.RestApi;
  constructor(scope: Construct, log: ApiLogs, props: BaseProps) {
    // khởi tạo api gateway hello-world as root 
    this.api = new apigw.RestApi(scope, `HelloWorldApiGateway-${props.deployEnvironment}`, {
      deployOptions: {
        accessLogDestination: new apigw.LogGroupLogDestination(log.apiLogs),
        accessLogFormat: apigw.AccessLogFormat.jsonWithStandardFields()
      }
    });
    this.api.root.addMethod('any');
  }
}
