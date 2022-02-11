import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppProps } from './app/interfaces/app-props';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppProps) {
    super(scope, id, props);
    // khởi tạo aws services
    const helloWorldFunction = new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(`./src/lambdas/hello-world`)
    });

    const helloWorldApiGW = props.baseStack.helloWorldApiGW

    helloWorldApiGW.root.addMethod('GET', new LambdaIntegration(helloWorldFunction));
  }
}
