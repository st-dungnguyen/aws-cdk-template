import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';


interface InfraProps extends StackProps {
  deployEnvironment: string;
}
export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: InfraProps) {
    super(scope, id, props);
    // Khởi tạo aws services
  }
}
