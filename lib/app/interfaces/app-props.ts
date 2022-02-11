import { Stack, StackProps } from 'aws-cdk-lib';
import { InfraStack } from '../../infra-stack';

export interface AppProps extends StackProps {
  baseStack: InfraStack;
  deployEnvironment: string;
}
