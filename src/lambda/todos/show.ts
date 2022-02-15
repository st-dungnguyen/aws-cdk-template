import { TodoServices } from '../../services/todos';
import { successResponse, notFoundResponse, response } from '../../common/http-response';
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from '../../common/http-response';

const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

export const handler = async (event: any = {}): Promise<any> => {
  const requestId = event.pathParameters.id;
  if (!requestId) {
    return response(HTTP_BAD_REQUEST, 'Missing path parameter id');
  }

  const params = {
    TableName: TABLE_NAME,
    Key: {
      [PRIMARY_KEY]: requestId
    }
  }

  try {
    const service = new TodoServices();
    const todo = await service.getItem(params);
    if (!todo) {
      return notFoundResponse('Todo not found');
    }
    return successResponse(todo);
  }
  catch (err) {
    return response(HTTP_INTERNAL_SERVER_ERROR, JSON.stringify(err));
  }
}
