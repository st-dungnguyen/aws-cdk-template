import * as AWS from 'aws-sdk';
const db = new AWS.DynamoDB()
exports.handler = async function (event: any) {
  const params = {
    TableName: 'Users',
    Key: {
      'id': { N: event.pathParameters.id }
    }
  }
  const usersTable = await db.getItem(params).promise();
  const user = usersTable.Item;

  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({message: 'User not found'})
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      user: AWS.DynamoDB.Converter.unmarshall(user)
    })
  }
}
