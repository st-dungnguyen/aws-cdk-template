import { StackProps } from 'aws-cdk-lib';
import { InfraStack } from '../infra-stack';

export interface BatchStackProps extends StackProps {
  instaStack: InfraStack
}
