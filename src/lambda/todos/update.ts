import { TodoServices } from '../../services/todos';
import { response, HTTP_BAD_REQUEST, HTTP_UPDATED, HTTP_INTERNAL_SERVER_ERROR } from '../../common/http-response';

const TABLE_NAME = process.env.TABLE_NAME || '';
const PRIMARY_KEY = process.env.PRIMARY_KEY || '';

export const handler = async (event: any = {}): Promise<any> => {
  if (!event.body) {
    return response(HTTP_BAD_REQUEST, 'Missing the parameter body');
  }

  const requestId = event.pathParameters.id;
  if (!requestId) {
    return response(HTTP_BAD_REQUEST, 'Missing the path parameter id');
  }

  const editedItem: any = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
  const editedItemProperties = Object.keys(editedItem);

  if (!editedItem || editedItemProperties.length < 1) {
    return response(HTTP_BAD_REQUEST, 'no arguments provided');
  }

  const firstProperty = editedItemProperties.splice(0, 1);
  const params: any = {
    TableName: TABLE_NAME,
    Key: {
      [PRIMARY_KEY]: requestId
    },
    UpdateExpression: `set #${firstProperty} = :${firstProperty}`,
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    ReturnValues: 'UPDATED_NEW'
  }
  params.ExpressionAttributeValues[`:${firstProperty}`] = editedItem[`${firstProperty}`];
  params.ExpressionAttributeNames[`#${firstProperty}`] = firstProperty;

  editedItemProperties.forEach(property => {
    params.UpdateExpression += `, #${property} = :${property}`;
    params.ExpressionAttributeValues[`:${property}`] = editedItem[property];
    params.ExpressionAttributeNames[`#${property}`] = property;
  });

  try {
    const todoService = new TodoServices();
    await todoService.updateItem(params);
    return response(HTTP_UPDATED, '');
  }
  catch (err) {
    return response(HTTP_INTERNAL_SERVER_ERROR, JSON.stringify(err));
  }
}
