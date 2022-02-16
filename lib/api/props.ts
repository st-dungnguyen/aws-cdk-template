import { StackProps } from 'aws-cdk-lib';
import { InfraStack } from '../infra-stack';

export interface ApiStackProps extends StackProps {
  infraStack: InfraStack,
}
