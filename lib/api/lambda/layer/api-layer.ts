
import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ApiStackProps } from '../../props';
import { EnvironmentVariables } from "../../../../environments/env";

export class ApiLayer {
  layer: lambda.LayerVersion;
  constructor(scope: Construct, props: ApiStackProps, env: EnvironmentVariables) {
    this.layer = new lambda.LayerVersion(scope, `project-name-${process.env.DEPLOY_ENVIRONMENT}-api-layer`, {
      layerVersionName: `project-name-${process.env.DEPLOY_ENVIRONMENT}-api-layer`,
      code: lambda.Code.fromAsset('layers'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X]
    });
  }
}
