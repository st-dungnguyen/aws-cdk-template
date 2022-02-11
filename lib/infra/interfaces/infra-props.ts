import { StackProps } from 'aws-cdk-lib';

export interface InfraProps extends StackProps {
  deployEnvironment: string;
}
