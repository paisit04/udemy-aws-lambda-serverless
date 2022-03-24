const AWS = require('aws-sdk');
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.listTodos = (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
  };

  dynamoDbClient.scan(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(new Error(error));
      return;
    }
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };

    callback(null, response);
  });
};
