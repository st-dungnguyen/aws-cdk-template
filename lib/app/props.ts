import { StackProps } from 'aws-cdk-lib';
import { BaseStack } from '../base-stack';

export interface AppProps extends StackProps {
  deployEnvironment: string;
  baseStack: BaseStack,
}
