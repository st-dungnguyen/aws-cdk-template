#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/app-stack';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();
const deployEnvironment = process.env.DEPLOY_ENVIRONMENT || 'stg';

// Khởi tạo Infra Stack
const baseStack = new InfraStack(app, 'InfraStack', {
  stackName: `template-infra-stack-${deployEnvironment}`,
  deployEnvironment: deployEnvironment
});

// Khởi tạo App Stack
const appStack = new AppStack(app, 'AppStack', {
  baseStack: baseStack, // Thêm InfraStack vào AppStack như 1 prop để AppStack có thể gọi các resources từ InfraStack
  stackName: `templdate-app-stack-${deployEnvironment}`,
  deployEnvironment: deployEnvironment
});
