import * as AWS from 'aws-sdk';

export class TodoServices {
  database: AWS.DynamoDB;
  tableName: string;
  constructor(tableName: string) {
    this.database = new AWS.DynamoDB();
    this.tableName = tableName;
  }

  async listItems() {
    const dataTable = await this.database.scan({ TableName: this.tableName}).promise();
    const items = dataTable.Items;
    if(!items) {
      return undefined
    }
    return items.map((value)=>AWS.DynamoDB.Converter.unmarshall(value));
  }

  async getItem(id: string) {
    const dataTable = await this.database.getItem({
      TableName: this.tableName,
      Key: { 'id': { N: id} }
    }).promise();
    const item = dataTable.Item;
    if(!item) {
      return undefined
    }
    return AWS.DynamoDB.Converter.unmarshall(item);
  }
}
