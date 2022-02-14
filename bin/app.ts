#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayStack } from '../lib/apigateway/infra';
import { LambdaStack } from '../lib/lambda/infra';
import { MonitorStack } from '../lib/monitor/infra';
import { DatabaseStack } from '../lib/database/infra';
import { env } from '../environments/env';

const app = new cdk.App();

// initialize stacks
const monitor = new MonitorStack(app, `monitor-stack-${env.DEPLOY_ENVIRONMENT}`, {}, env);

const apiGatewayStack = new ApiGatewayStack(app, `apigateway-stack-${env.DEPLOY_ENVIRONMENT}`, {
  // access cross stack as props
  logGroup: monitor.logGroup,
});

const databaseStack = new DatabaseStack(app, `database-stack-${env.DEPLOY_ENVIRONMENT}`, {});

const lambdaStack = new LambdaStack(app, `lambda-stack-${env.DEPLOY_ENVIRONMENT}`, {
  // access cross stack as props
  homeApiGateway: apiGatewayStack.homeApiGateway,
  userApiGateway: apiGatewayStack.userApiGateway,
}, env);

