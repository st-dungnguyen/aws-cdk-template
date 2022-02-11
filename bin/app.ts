#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/app-stack';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();
const deployEnvironment = process.env.DEPLOY_ENVIRONMENT || 'stg';

// Khởi tạo Infra Stack
new InfraStack(app, 'InfraStack', {
  stackName: `template-infra-stack-${deployEnvironment}`,
  deployEnvironment: deployEnvironment
});

// Khởi tạo App Stack
new AppStack(app, 'AppStack', {
  stackName: `templdate-app-stack-${deployEnvironment}`,
  deployEnvironment: deployEnvironment
});
