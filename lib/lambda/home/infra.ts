import { Construct } from 'constructs';
import { LambdaProps } from '../props';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export class HomeFunction{
  constructor(scope: Construct, props: LambdaProps) {

    const homeFunction = new lambda.Function(scope, `HomeFunction-${process.env.DEPLOY_ENVIRONMENT}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('./dist/src/lambda/home')
    });

    // mock api gateway with lambda function
    const apigw = props.homeApiGateway.api;
    apigw.root.addMethod('GET', new LambdaIntegration(homeFunction));
  }
}
