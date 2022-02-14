#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayStack } from '../lib/apigateway/infra';
import { LambdaStack } from '../lib/lambda/infra';
import { MonitorStack } from '../lib/monitor/infra';

const deployEnv = process.env.DEPLOY_ENVIRONMENT;
const app = new cdk.App();

// initialize stacks
const monitor = new MonitorStack(app, `monitor-stack-${deployEnv}`, {});

const apiGatewayStack = new ApiGatewayStack(app, `apigateway-stack-${deployEnv}`, {
  // access cross stack as props
  logGroup: monitor.logGroup
});

const lambdaStack = new LambdaStack(app, `lambda-stack-${deployEnv}`, {
  // access cross stack as props
  homeApiGateway: apiGatewayStack.homeApiGateway,
  userApiGateway: apiGatewayStack.userApiGateway
});

