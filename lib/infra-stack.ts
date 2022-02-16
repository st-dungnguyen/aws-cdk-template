import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { InfraStackProps } from './infra/props';
import { EnvironmentVariables } from '../environments/env';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
// import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { ApiMonitor } from './monitor/api-monitor';
import { BatchMonitor } from './monitor/batch-monitor';
import { TodoApiGateway } from './infra/apigateway/todos';
import { TodosTable } from './infra/database/todos';

export class InfraStack extends Stack {
  // define attributes
  apiMonitor: logs.LogGroup;
  batchMonitor: logs.LogGroup;
  todosApiGateway: apigw.RestApi;
  // todosTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: InfraStackProps, env: EnvironmentVariables) {
    super(scope, id, props)
    // initialize attributes
    this.initMonitors(props, env)
    this.initApiGateway(props, env, {
      apiMonitor: this.apiMonitor
    });
    this.initDatabases(props, env)
  }

  initMonitors(props: InfraStackProps, env: EnvironmentVariables){
    this.apiMonitor = new ApiMonitor(this, props, env).monitor;
    this.batchMonitor = new BatchMonitor(this, props, env).monitor;
  }

  initApiGateway(props: InfraStackProps, env: EnvironmentVariables, cross: any = {}) {
    this.todosApiGateway = new TodoApiGateway(this, props, env, cross).api;
  }

  initDatabases(props: InfraStackProps, env: EnvironmentVariables) {
    // this.todosTable = new TodosTable(this, props, env).table;
    new TodosTable(this, props, env).table;
  }
}
