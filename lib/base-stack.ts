import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BaseProps } from './base/props';
import { ApiLogs } from './base/cloudwatch/api-logs';
import { HelloWorldApiGateway } from './base/apigateway/hello-world';

export class BaseStack extends Stack {
  apiLogs: ApiLogs;
  helloWorldApiGateway: HelloWorldApiGateway;
  
  constructor(scope: Construct, id: string, props: BaseProps) {
    super(scope, id, props);
    // Khởi tạo aws services
    const logs = this.initLog(props);
    this.apiLogs = logs.apiLogs;

    const apigws = this.initApiGateway(logs.apiLogs, props); 
    this.helloWorldApiGateway = apigws.helloWorldApiGateway;
  }

  initLog(props: BaseProps) {
    const apiLogs = new ApiLogs(this, props);
    return { apiLogs }
  }

  initApiGateway(log: ApiLogs, props: BaseProps) {
    const helloWorldApiGateway = new HelloWorldApiGateway(this, log, props);
    return { helloWorldApiGateway }
  }
}
