import { TodoServices } from '../../services/todos';
import { success, notFound } from '../../common/http-response';

exports.handler = async function (event: any) {
  const tableName = process.env.TABLE_NAME || '';
  const service = new TodoServices(tableName);
  const todo = await service.getItem(event.pathParameters.id);

  if(!todo) {
    return notFound({message: 'Todo not found'});
  }
  return success(todo);
}
