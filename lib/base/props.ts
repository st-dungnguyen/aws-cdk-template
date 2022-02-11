import { StackProps } from 'aws-cdk-lib';

export interface BaseProps extends StackProps {
  deployEnvironment: string;
}
