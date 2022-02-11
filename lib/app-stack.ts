import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';


interface AppProps extends StackProps {
  deployEnvironment: string;
}
export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: AppProps) {
    super(scope, id, props);
    // khởi tạo aws services
  }
}
