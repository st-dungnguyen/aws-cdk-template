#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../lib/api-stack';
import { BatchStack } from '../lib/batch-stack';
import { InfraStack } from '../lib/infra-stack';
import { env } from '../environments/env';

const app = new cdk.App();
const DEPLOY_ENVIRONMENT = process.env.DEPLOY_ENVIRONMENT || '';
// initialize stacks
const infraStack = new InfraStack(app, `project-name-${DEPLOY_ENVIRONMENT}-infra-stack`, {}, env);

const apiStack = new ApiStack(app, `project-name-${DEPLOY_ENVIRONMENT}-api-stack`, {
  infraStack: infraStack
}, env);

const batchStack = new BatchStack(app, `project-name-${DEPLOY_ENVIRONMENT}-batch-stack`, {
  instaStack: infraStack
}, env);
