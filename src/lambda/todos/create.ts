import { TodoServices } from '../../services/todos';
import { response, HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_INTERNAL_SERVER_ERROR } from '../../common/http-response';
import { v4 as uuidv4 } from 'uuid';

const TALBE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

export const handler = async (event: any ={}): Promise<any> => {
  if (!event.body) {
    return response(HTTP_BAD_REQUEST, 'Missing parameter body');
  }

  const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
  
  item[PRIMARY_KEY] = uuidv4();

  const params = {
    TableName: TALBE_NAME,
    Item: item
  }

  try {
    const todoService = new TodoServices();
    await todoService.putItem(params);
    return response(HTTP_CREATED, '');
  }
  catch (err) {
    return response(HTTP_INTERNAL_SERVER_ERROR, JSON.stringify(err));
  }
}
