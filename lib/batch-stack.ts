import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BatchStackProps } from './batch/props';
import { EnvironmentVariables } from '../environments/env';

export class BatchStack extends Stack {
  constructor(scope: Construct, id: string, props: BatchStackProps, env: EnvironmentVariables) {
    super(scope, id, props)
  }
}
