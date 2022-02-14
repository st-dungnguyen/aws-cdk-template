import { StackProps } from 'aws-cdk-lib';
import { HomeApiGateway } from '../apigateway/home/infra';
import { UserApiGateway } from '../apigateway/user/infra';

export interface LambdaProps extends StackProps {
  homeApiGateway: HomeApiGateway,
  userApiGateway: UserApiGateway
}
