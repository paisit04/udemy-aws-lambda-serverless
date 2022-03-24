const AWS = require('aws-sdk');
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.getTodo = (event, context, callback) => {
  const params = {
    TableName: TODO_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDbClient.get(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(new Error(error));
      return;
    }
    // create a response
    const response = data.Item
      ? {
          statusCode: 200,
          body: JSON.stringify(data.Item),
        }
      : {
          statusCode: 404,
          body: JSON.stringify({ message: 'Todo not found' }),
        };

    callback(null, response);
  });
};
