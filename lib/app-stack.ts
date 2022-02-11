import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppProps } from './app/props';
import { HelloWorldIndexFunction } from './app/lambda/hello-world';
export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppProps) {
    super(scope, id, props);
    // khởi tạo aws services
    const lambdas = this.initLambda(props);
  }

  initLambda(props: AppProps) {
    const helloWorldFunction = new HelloWorldIndexFunction(this, props);
    return { helloWorldFunction }
  }
}
