import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { AppProps } from '../../props';

export class HelloWorldIndexFunction {
  helloWorldFunction: lambda.Function;
  constructor(scope: Construct, props: AppProps) {
    // init lambda function
    this.helloWorldFunction = new lambda.Function(scope, `HelloWorldIndexFunction-${props.deployEnvironment}`, {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('./dist/src/lambdas/hello-world')
    });

    // mock api gateway with lambda function
    const apigw = props.baseStack.helloWorldApiGateway.api;
    apigw.root.addMethod('GET', new LambdaIntegration(this.helloWorldFunction));
  }
}
