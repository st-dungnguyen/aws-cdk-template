import { TodoServices } from '../../services/todos';
import { success } from '../../common/http-response';

exports.handler = async function (event: any) {
  console.log(process.env.TABLE_NAME);
  console.log(event);
  const tableName = process.env.TABLE_NAME || '';
  console.log(tableName);
  const service = new TodoServices(tableName);
  const todos = await service.listItems();

  return success(todos);
}
