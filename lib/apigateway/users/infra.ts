import { Construct } from 'constructs';
import { ApiGatewayProps } from '../props';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class UserApiGateway {
  api: apigw.RestApi
  constructor(scope: Construct, props: ApiGatewayProps) {
    this.api = new apigw.RestApi(scope, `UserApiGateway-${process.env.DEPLOY_ENVIRONMENT}`, {
      deployOptions: {
        accessLogDestination: new apigw.LogGroupLogDestination(props.logGroup),
        accessLogFormat: apigw.AccessLogFormat.jsonWithStandardFields()
      }
    });
    this.api.root.addMethod('any');
  }
}
