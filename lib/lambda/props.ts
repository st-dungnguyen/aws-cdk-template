import { StackProps } from 'aws-cdk-lib';
import { TodoApiGateway } from '../apigateway/todos/infra';

export interface LambdaProps extends StackProps {
  todoApiGateway: TodoApiGateway
}
