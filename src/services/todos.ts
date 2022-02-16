import * as AWS from 'aws-sdk';

export class TodoServices {
  database: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.database = new AWS.DynamoDB.DocumentClient();
  }

  async listItems(params: any = {}) {
    const dataTable = await this.database.scan(params).promise();
    return dataTable.Items;
  }

  async getItem(params: any = {}) {
    const dataTable = await this.database.get(params).promise();
    return dataTable.Item;
  }

  async putItem(params: any = {}) {
    await this.database.put(params).promise();
  }

  async updateItem(params: any = {}){
    await this.database.update(params).promise();
  }

  async deleteItem(params: any = {}) {
    await this.database.delete(params).promise();
  }
}
