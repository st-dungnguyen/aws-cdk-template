import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { InfraProps } from './infra/interfaces/infra-props';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as cloudwatch from 'aws-cdk-lib/aws-logs';


export class InfraStack extends Stack {
  helloWorldApiGW: apigw.RestApi
  constructor(scope: Construct, id: string, props?: InfraProps) {
    super(scope, id, props);

    const cloudwatchLog = new cloudwatch.LogGroup(this, 'ApiGatewayLogs');
    this.helloWorldApiGW = new apigw.RestApi(this, 'HelloWorldApiGateway', {
      deployOptions: {
        accessLogDestination: new apigw.LogGroupLogDestination(cloudwatchLog),
        accessLogFormat: apigw.AccessLogFormat.jsonWithStandardFields()
      }
    });
    this.helloWorldApiGW.root.addMethod('any')
  }
}
