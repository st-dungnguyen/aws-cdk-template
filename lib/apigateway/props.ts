import { StackProps } from 'aws-cdk-lib';
import { LogGroup } from 'aws-cdk-lib/aws-logs';

export interface ApiGatewayProps extends StackProps {
  logGroup: LogGroup;
}
