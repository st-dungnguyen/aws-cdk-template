import { TodoServices } from '../../services/todos';
import { successResponse, response } from '../../common/http-response';
import { HTTP_INTERNAL_SERVER_ERROR } from '../../common/http-response';

export const handler = async (): Promise<any> => {
  const params = {
    TableName: process.env.TABLE_NAME || ''
  }
  try {
    const todoService = new TodoServices();
    const todos = await todoService.listItems(params);
    return successResponse(todos);
  }
  catch (err) {
    return response(HTTP_INTERNAL_SERVER_ERROR, JSON.stringify(err));
  }
}
