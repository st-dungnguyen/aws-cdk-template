import * as AWS from 'aws-sdk';

exports.handler = async function (event: any) {
  const db = new AWS.DynamoDB()

  const usersTable = await db.scan({TableName: 'Users'}).promise();

  const users = usersTable.Items;

  if (!users) {
    return {
      statusCode: 404,
      body: JSON.stringify({message: 'No users'})
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      users: users.map((value)=>AWS.DynamoDB.Converter.unmarshall(value))
    })
  }
}
