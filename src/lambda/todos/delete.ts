import { TodoServices } from '../../services/todos';
import { response, HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, successResponse } from '../../common/http-response';

const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

export const handler = async (event: any = {}): Promise<any> => {
  const requestId = event.pathParameters.id;
  if (!requestId) {
    return response(HTTP_BAD_REQUEST, 'Missing the path parameter id');
  }
  
  const params = {
    TableName: TABLE_NAME,
    Key: {
      [PRIMARY_KEY]: requestId
    }
  };

  try {
    const todoService = new TodoServices();
    await todoService.deleteItem(params);
    return successResponse('');
  }
  catch (err) {
    return response(HTTP_INTERNAL_SERVER_ERROR, JSON.stringify(err));
  }
}
