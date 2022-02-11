#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/app-stack';
import { BaseStack } from '../lib/base-stack';

const deployEnvironment = process.env.DEPLOY_ENVIRONMENT || 'stg';
const app = new cdk.App();

// Khởi tạo Base Stack
const baseStack = new BaseStack(app, 'BaseStack', {
  stackName: `template-base-stack-${deployEnvironment}`,
  deployEnvironment: deployEnvironment
});

// Khởi tạo App Stack
const appStack = new AppStack(app, 'AppStack', {
  stackName: `templdate-app-stack-${deployEnvironment}`,
  deployEnvironment: deployEnvironment,
  baseStack: baseStack,
});
