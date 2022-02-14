import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGatewayProps } from './props';
import { HomeApiGateway } from './home/infra';
import { UserApiGateway } from './users/infra';

export class ApiGatewayStack extends Stack {
  // define attributes
  homeApiGateway: HomeApiGateway;
  userApiGateway: UserApiGateway;
  constructor(scope: Construct, id: string, props: ApiGatewayProps) {
    super(scope, id, props)

    // initialize
    this.homeApiGateway = new HomeApiGateway(this, props);
    this.userApiGateway = new UserApiGateway(this, props);
  }
}
