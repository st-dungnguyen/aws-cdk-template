import { TodoServices } from '../../services/todos';
import { success } from '../../common/http-response';

exports.handler = async function (event: any) {
  const tableName = process.env.TABLE_NAME || '';
  const service = new TodoServices(tableName);
  const todos = await service.listItems();

  return success(todos);
}
